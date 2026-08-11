'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deletePostAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { postQueries } from '../queries/post-query';
import { ROUTES } from '@/constants/routes';
import { ErrorResponse } from '@/lib/error-response';

export function useDeletePost(postId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return unwrapAction(await deletePostAction({ postId }));
    },
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: postQueries.all() });
      router.push(ROUTES.TALK.LIST);
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse ? err.message : '게시글 삭제에 실패했습니다.',
      );
    },
  });

  return {
    deletePost: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
