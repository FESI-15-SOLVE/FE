import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useDeletePost } from '../use-delete-post';
import { postQueries } from '../../queries/post-query';
import { ROUTES } from '@/constants/routes';
import { createAppQueryClient } from '@/providers/query-provider';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockDeletePostAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/post/post-actions', () => ({
  deletePostAction: (params: unknown) => mockDeletePostAction(params),
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

describe('useDeletePost 훅', () => {
  let queryClient: QueryClient;
  const postId = 55;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('deletePost 실행 시 deletePostAction이 올바른 postId로 실행된다', async () => {
    const { result } = renderHook(() => useDeletePost(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deletePost();

    await waitFor(() => expect(mockDeletePostAction).toHaveBeenCalledWith({ postId }));
  });

  it('게시글 삭제 성공 시 postQueries.all 쿼리가 invalidate되고 목록으로 이동하며 성공 토스트가 표시된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeletePost(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deletePost();

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: postQueries.all() }),
      );
    });
    expect(mockPush).toHaveBeenCalledWith(ROUTES.TALK.LIST);
    expect(toast.success).toHaveBeenCalledWith('게시글이 삭제되었습니다.');
  });

  it('게시글 삭제 실패 시 에러 토스트가 표시된다', async () => {
    mockDeletePostAction.mockRejectedValueOnce(new Error('삭제 실패'));

    const { result } = renderHook(() => useDeletePost(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.deletePost();

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });
});
