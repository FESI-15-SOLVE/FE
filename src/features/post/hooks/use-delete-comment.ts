'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';

export function useDeleteComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return unwrapAction(
        await deleteCommentAction({ postId, commentId }),
      );
    },
    meta: {
      toastMessage: '댓글이 삭제되었습니다.',
      errorMessage: '댓글 삭제에 실패했습니다.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
    },
  });

  return {
    deleteComment: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
