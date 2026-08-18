import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { usePostLike } from '../use-post-like';
import { postQueries } from '../../queries/post-query';
import { createMockPost } from '@/__mocks__/fixtures';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockLikePostAction = vi.fn().mockResolvedValue({ data: {} });
const mockUnlikePostAction = vi.fn().mockResolvedValue({ data: {} });

vi.mock('@/actions/post/post-actions', () => ({
  likePostAction: (params: unknown) => mockLikePostAction(params),
  unlikePostAction: (params: unknown) => mockUnlikePostAction(params),
}));

vi.mock('@/hooks/use-auth-action', () => ({
  useAuthAction: () => <T extends unknown[], R>(fn: (...args: T) => R) => fn,
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

describe('usePostLike 훅', () => {
  let queryClient: QueryClient;
  const postId = 201;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('좋아요가 눌리지 않은 상태에서 toggleLike 실행 시 likePostAction이 호출된다', async () => {
    const post = createMockPost({ id: postId, isLiked: false, likeCount: 5 });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => usePostLike(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleLike(false);

    await waitFor(() => {
      expect(mockLikePostAction).toHaveBeenCalledWith({ postId });
    });
  });

  it('이미 좋아요가 눌린 상태에서 toggleLike 실행 시 unlikePostAction이 호출된다', async () => {
    const post = createMockPost({ id: postId, isLiked: true, likeCount: 6 });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => usePostLike(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleLike(true);

    await waitFor(() => {
      expect(mockUnlikePostAction).toHaveBeenCalledWith({ postId });
    });
  });

  it('toggleLike(false) 실행 시 onMutate에서 likeCount가 1 증가하고 isLiked가 true로 낙관적 업데이트된다', async () => {
    const post = createMockPost({ id: postId, isLiked: false, likeCount: 10 });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => usePostLike(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleLike(false);

    await waitFor(() => {
      const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
      return cached?.isLiked === true;
    });

    const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
    expect(cached.isLiked).toBe(true);
    expect(cached.likeCount).toBe(11);
  });

  it('toggleLike(true) 실행 시 onMutate에서 likeCount가 1 감소하고 isLiked가 false로 낙관적 업데이트된다', async () => {
    const post = createMockPost({ id: postId, isLiked: true, likeCount: 10 });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => usePostLike(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleLike(true);

    await waitFor(() => {
      const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
      return cached?.isLiked === false;
    });

    const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
    expect(cached.isLiked).toBe(false);
    expect(cached.likeCount).toBe(9);
  });

  it('API 실패 시 이전 포스트 캐시 데이터로 롤백된다', async () => {
    mockLikePostAction.mockRejectedValueOnce(new Error('좋아요 실패'));

    const post = createMockPost({ id: postId, isLiked: false, likeCount: 3 });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => usePostLike(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleLike(false);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });

    const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
    expect(cached.isLiked).toBe(false);
    expect(cached.likeCount).toBe(3);
  });
});
