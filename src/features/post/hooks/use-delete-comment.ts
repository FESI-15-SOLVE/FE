'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { ErrorResponse } from '@/lib/error-response';

export function useDeleteComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return unwrapAction(
        await deleteCommentAction({ postId, commentId }),
      );
    },
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse ? err.message : '댓글 삭제에 실패했습니다.',
      );
    },
  });

  return {
    deleteComment: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
