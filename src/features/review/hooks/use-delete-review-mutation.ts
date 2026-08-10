import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deleteReviewAction } from '@/actions/review/review-actions';
import { unwrapAction } from '@/lib/safe-action';
import { reviewQueries } from '../queries/review-query';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { UserReviewsResponse } from '@/api/data-contracts';
import { toast } from 'sonner';
import { ErrorResponse } from '@/lib/error-response';

export interface DeleteReviewPayload {
  reviewId: number;
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DeleteReviewPayload) => {
      return unwrapAction(await deleteReviewAction(payload));
    },

    onSuccess: (_data, { reviewId }) => {
      toast.success('리뷰가 삭제되었습니다.');

      // 1. 내 리뷰 무한스크롤 캐시에서 해당 리뷰만 0ms 즉시 제거
      queryClient.setQueriesData<{ pages?: UserReviewsResponse[] }>(
        { queryKey: reviewQueries.myWrittenListKeys() },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              if (page.data) {
                page.data = page.data.filter((item) => item.id !== reviewId);
              }
            });
          }),
      );

      // 2. 작성 가능한 모임 목록 캐시 초기화 (탭 전환 시 Suspense 스켈레톤과 함께 최신화)
      queryClient.resetQueries({ queryKey: meetingQueries.joinedListKeys() });
    },

    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '리뷰 삭제 중 오류가 발생했습니다.',
      );
    },
  });
}
