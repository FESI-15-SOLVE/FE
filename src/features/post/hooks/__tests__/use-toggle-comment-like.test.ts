import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useToggleCommentLike } from '../use-toggle-comment-like';
import { postQueries } from '../../queries/post-query';
import { createMockPost } from '@/__mocks__/fixtures';
import { createAppQueryClient } from '@/providers/query-provider';
import { Comment } from '@/api/data-contracts';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockLikeCommentAction = vi.fn().mockResolvedValue({ data: {} });
const mockUnlikeCommentAction = vi.fn().mockResolvedValue({ data: {} });

vi.mock('@/actions/post/post-actions', () => ({
  likeCommentAction: (params: unknown) => mockLikeCommentAction(params),
  unlikeCommentAction: (params: unknown) => mockUnlikeCommentAction(params),
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

describe('useToggleCommentLike 훅', () => {
  let queryClient: QueryClient;
  const postId = 101;
  const commentId = 505;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('좋아요가 눌리지 않은 상태에서 실행 시 likeCommentAction이 호출된다', async () => {
    const post = createMockPost({
      id: postId,
      comments: [
        { id: commentId, content: '댓글', isLiked: false, likeCount: 2 } as unknown as Comment,
      ],
    });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => useToggleCommentLike(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleCommentLike(false);

    await waitFor(() => {
      expect(mockLikeCommentAction).toHaveBeenCalledWith({ postId, commentId });
    });
  });

  it('이미 좋아요가 눌린 상태에서 실행 시 unlikeCommentAction이 호출된다', async () => {
    const post = createMockPost({
      id: postId,
      comments: [
        { id: commentId, content: '댓글', isLiked: true, likeCount: 3 } as unknown as Comment,
      ],
    });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => useToggleCommentLike(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleCommentLike(true);

    await waitFor(() => {
      expect(mockUnlikeCommentAction).toHaveBeenCalledWith({ postId, commentId });
    });
  });

  it('toggleCommentLike(false) 시 onMutate에서 댓글 likeCount가 1 증가하고 isLiked가 true로 낙관적 업데이트된다', async () => {
    const post = createMockPost({
      id: postId,
      comments: [
        { id: commentId, content: '댓글', isLiked: false, likeCount: 2 } as unknown as Comment,
      ],
    });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => useToggleCommentLike(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleCommentLike(false);

    await waitFor(() => {
      const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
      const target = cached?.comments.find((c) => c.id === commentId);
      return target?.isLiked === true;
    });

    const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
    const target = cached?.comments.find((c) => c.id === commentId);
    expect(target?.isLiked).toBe(true);
    expect(target?.likeCount).toBe(3);
  });

  it('API 실패 시 댓글 캐시가 이전 데이터로 롤백된다', async () => {
    mockLikeCommentAction.mockRejectedValueOnce(new Error('댓글 좋아요 실패'));

    const post = createMockPost({
      id: postId,
      comments: [
        { id: commentId, content: '댓글', isLiked: false, likeCount: 2 } as unknown as Comment,
      ],
    });
    queryClient.setQueryData(postQueries.detailKey(postId), post);

    const { result } = renderHook(() => useToggleCommentLike(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.toggleCommentLike(false);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());

    const cached = queryClient.getQueryData(postQueries.detailKey(postId)) as typeof post;
    const target = cached?.comments.find((c) => c.id === commentId);
    expect(target?.isLiked).toBe(false);
    expect(target?.likeCount).toBe(2);
  });
});
