'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePostAction, unlikePostAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { PostWithComments } from '@/api/data-contracts';
import { useAuthAction } from '@/hooks/use-auth-action';

export function usePostLike(postId: number, _initialLiked?: boolean, _initialCount?: number) {
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
    meta: {
      errorMessage: '좋아요 처리에 실패했습니다.',
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
    onError: (_err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postQueries.detailKey(postId), context.previousPost);
      }
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
