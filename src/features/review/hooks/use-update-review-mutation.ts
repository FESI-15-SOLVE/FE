import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { updateReviewAction } from '@/actions/review/review-actions';
import { unwrapAction } from '@/lib/safe-action';
import { reviewQueries } from '../queries/review-query';
import { UserReviewsResponse } from '@/api/data-contracts';
import { toast } from 'sonner';
import { ErrorResponse } from '@/lib/error-response';

export interface UpdateReviewPayload {
  reviewId: number;
  score: number;
  comment: string;
}

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateReviewPayload) => {
      return unwrapAction(await updateReviewAction(payload));
    },

    onSuccess: (_data, { reviewId, score, comment }) => {
      toast.success('리뷰가 수정되었습니다.');

      // 내 리뷰 무한스크롤 캐시에서 수정된 항목만 정밀 패치 (목록 전체 리셋 방지)
      queryClient.setQueriesData<{ pages?: UserReviewsResponse[] }>(
        { queryKey: reviewQueries.myWrittenListKeys() },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              const target = page.data?.find((item) => item.id === reviewId);
              if (target) {
                target.score = score;
                target.comment = comment;
              }
            });
          }),
      );
    },

    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '리뷰 수정 중 오류가 발생했습니다.',
      );
    },
  });
}
