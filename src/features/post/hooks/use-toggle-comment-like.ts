'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { likeCommentAction, unlikeCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { PostWithComments } from '@/api/data-contracts';
import { useAuthAction } from '@/hooks/use-auth-action';
import { ErrorResponse } from '@/lib/error-response';

export function useToggleCommentLike(postId: number, commentId: number) {
  const queryClient = useQueryClient();
  const withAuth = useAuthAction();

  const mutation = useMutation({
    mutationFn: async (isLikedCurrently: boolean) => {
      if (isLikedCurrently) {
        return unwrapAction(
          await unlikeCommentAction({ postId, commentId }),
        );
      } else {
        return unwrapAction(
          await likeCommentAction({ postId, commentId }),
        );
      }
    },
    onMutate: async (isLikedCurrently) => {
      const detailKey = postQueries.detailKey(postId);
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousPost = queryClient.getQueryData<PostWithComments>(detailKey);

      if (previousPost) {
        queryClient.setQueryData<PostWithComments>(detailKey, {
          ...previousPost,
          comments: previousPost.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                isLiked: !isLikedCurrently,
                likeCount: isLikedCurrently
                  ? Math.max(0, comment.likeCount - 1)
                  : comment.likeCount + 1,
              };
            }
            return comment;
          }),
        });
      }

      return { previousPost };
    },
    onError: (err, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postQueries.detailKey(postId), context.previousPost);
      }
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '댓글 좋아요 처리에 실패했습니다.',
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
    },
  });

  const toggleCommentLike = withAuth((isLikedCurrently: boolean) => {
    mutation.mutate(isLikedCurrently);
  });

  return {
    toggleCommentLike,
    isLiking: mutation.isPending,
  };
}
