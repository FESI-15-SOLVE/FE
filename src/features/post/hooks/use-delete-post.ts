'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deletePostAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { ROUTES } from '@/constants/routes';

export function useDeletePost(postId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return unwrapAction(await deletePostAction({ postId }));
    },
    meta: {
      toastMessage: '게시글이 삭제되었습니다.',
      errorMessage: '게시글 삭제에 실패했습니다.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.all() });
      router.push(ROUTES.TALK.LIST);
    },
  });

  return {
    deletePost: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
