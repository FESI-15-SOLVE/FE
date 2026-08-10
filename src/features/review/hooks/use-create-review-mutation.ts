import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { createReviewAction } from '@/actions/review/review-actions';
import { unwrapAction } from '@/lib/safe-action';
import { meetingQueries, JOINED_WRITABLE_PARAMS } from '@/features/meeting/queries/meeting-query';
import { reviewQueries } from '../queries/review-query';
import { JoinedMeeting, JoinedMeetingList } from '@/api/data-contracts';
import { toast } from 'sonner';
import { ErrorResponse } from '@/lib/error-response';

export interface CreateReviewPayload {
  meetingId: number;
  score: number;
  comment: string;
}

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      return unwrapAction(await createReviewAction(payload));
    },

    onSuccess: (_data, { meetingId }) => {
      toast.success('리뷰가 성공적으로 작성되었습니다.');

      // 1. "작성 가능한 리뷰" 탭 캐시: 해당 모임 카드 0ms 즉시 제거
      queryClient.setQueriesData<{ pages?: { data?: JoinedMeeting[] }[] }>(
        { queryKey: meetingQueries.joinedListKey(JOINED_WRITABLE_PARAMS) },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              if (page.data) {
                page.data = page.data.filter((item) => item.id !== meetingId);
              }
            });
          }),
      );

      // 2. "나의 모임" 탭 캐시: 해당 모임의 isReviewed를 true로 즉시 패치
      //    → 리뷰 작성하기 버튼이 0ms 즉시 사라짐 (카드는 유지)
      queryClient.setQueriesData<{ pages?: JoinedMeetingList[] }>(
        { queryKey: meetingQueries.joinedListKey(undefined) },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              const target = page.data?.find((item) => item.id === meetingId);
              if (target) {
                target.isReviewed = true;
              }
            });
          }),
      );

      // 3. 내 리뷰 목록 캐시 초기화 → 서버 최신 데이터 재요청
      queryClient.resetQueries({ queryKey: reviewQueries.myWrittenListKeys() });
    },

    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '리뷰 작성 중 오류가 발생했습니다.',
      );
    },
  });
}
