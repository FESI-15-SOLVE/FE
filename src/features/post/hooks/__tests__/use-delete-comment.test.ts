import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useDeleteComment } from '../use-delete-comment';
import { postQueries } from '../../queries/post-query';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockDeleteCommentAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/post/post-actions', () => ({
  deleteCommentAction: (params: unknown) => mockDeleteCommentAction(params),
}));

vi.mock('@/lib/safe-action', async (importOriginal) => {
  return await importOriginal();
});

import { toast } from 'sonner';

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useDeleteComment 훅', () => {
  let queryClient: QueryClient;
  const postId = 10;
  const commentId = 20;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('deleteComment 실행 시 deleteCommentAction이 올바른 id로 호출된다', async () => {
    const { result } = renderHook(() => useDeleteComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deleteComment();

    await waitFor(() => expect(mockDeleteCommentAction).toHaveBeenCalledWith({
      postId,
      commentId,
    }));
  });

  it('댓글 삭제 성공 시 detailKey가 invalidate되고 성공 토스트가 표시된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeleteComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deleteComment();

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: postQueries.detailKey(postId) }),
      );
    });
    expect(toast.success).toHaveBeenCalledWith('댓글이 삭제되었습니다.');
  });

  it('댓글 삭제 실패 시 에러 토스트가 표시된다', async () => {
    mockDeleteCommentAction.mockRejectedValueOnce(new Error('삭제 실패'));

    const { result } = renderHook(() => useDeleteComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deleteComment();

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });
});
