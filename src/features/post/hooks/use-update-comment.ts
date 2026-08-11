'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { ErrorResponse } from '@/lib/error-response';

export function useUpdateComment(postId: number, commentId: number, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      return unwrapAction(
        await updateCommentAction({ postId, commentId, content }),
      );
    },
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.');
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse ? err.message : '댓글 수정에 실패했습니다.',
      );
    },
  });

  const updateComment = (content: string) => {
    if (!content.trim()) {
      toast.error('댓글 내용을 입력해 주세요.');
      return;
    }
    mutation.mutate(content.trim());
  };

  return {
    updateComment,
    isUpdating: mutation.isPending,
  };
}
