'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { likePostAction, unlikePostAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { PostWithComments } from '@/api/data-contracts';
import { useAuthAction } from '@/hooks/use-auth-action';
import { ErrorResponse } from '@/lib/error-response';

export function usePostLike(postId: number, initialLiked?: boolean, initialCount?: number) {
  const queryClient = useQueryClient();
  const withAuth = useAuthAction();

  const mutation = useMutation({
    mutationFn: async (isLikedCurrently: boolean) => {
      if (isLikedCurrently) {
        return unwrapAction(await unlikePostAction({ postId }));
      } else {
        return unwrapAction(await likePostAction({ postId }));
      }
    },
    onMutate: async (isLikedCurrently) => {
      const detailKey = postQueries.detailKey(postId);
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousPost = queryClient.getQueryData<PostWithComments>(detailKey);

      if (previousPost) {
        queryClient.setQueryData<PostWithComments>(detailKey, {
          ...previousPost,
          isLiked: !isLikedCurrently,
          likeCount: isLikedCurrently
            ? Math.max(0, previousPost.likeCount - 1)
            : previousPost.likeCount + 1,
        });
      }

      return { previousPost };
    },
    onError: (err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postQueries.detailKey(postId), context.previousPost);
      }
      toast.error(
        err instanceof ErrorResponse ? err.message : '좋아요 처리에 실패했습니다.',
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.all() });
    },
  });

  const toggleLike = withAuth((isLikedCurrently: boolean) => {
    mutation.mutate(isLikedCurrently);
  });

  return {
    toggleLike,
    isLoading: mutation.isPending,
  };
}
