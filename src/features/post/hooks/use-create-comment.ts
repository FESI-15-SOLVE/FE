'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createCommentAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { useAuthAction } from '@/hooks/use-auth-action';

export function useCreateComment(postId: number, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const withAuth = useAuthAction();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      return unwrapAction(await createCommentAction({ postId, content }));
    },
    meta: {
      toastMessage: '댓글이 작성되었습니다.',
      errorMessage: '댓글 작성에 실패했습니다.',
    },
    onSuccess: () => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: postQueries.detailKey(postId) });
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
