'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { useAuthAction } from '@/hooks/use-auth-action';
import { ErrorResponse } from '@/lib/error-response';

export function useCreateComment(postId: number, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const withAuth = useAuthAction();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      return unwrapAction(await createCommentAction({ postId, content }));
    },
    onSuccess: () => {
      toast.success('댓글이 작성되었습니다.');
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse ? err.message : '댓글 작성에 실패했습니다.',
      );
    },
  });

  const createComment = withAuth((content: string) => {
    if (!content.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }
    mutation.mutate(content.trim());
  });

  return {
    createComment,
    isCreating: mutation.isPending,
  };
}
