import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCreateComment } from '../use-create-comment';
import { postQueries } from '../../queries/post-query';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockCreateCommentAction = vi.fn().mockResolvedValue({ data: { id: 10 } });
vi.mock('@/actions/post/post-actions', () => ({
  createCommentAction: (params: unknown) => mockCreateCommentAction(params),
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

describe('useCreateComment 훅', () => {
  let queryClient: QueryClient;
  const postId = 123;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('빈 문자열이나 공백만 입력 시 에러 토스트를 띄우고 API를 호출하지 않는다', () => {
    const { result } = renderHook(() => useCreateComment(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.createComment('   ');

    expect(toast.error).toHaveBeenCalledWith('댓글 내용을 입력해주세요.');
    expect(mockCreateCommentAction).not.toHaveBeenCalled();
  });

  it('유효한 내용을 전달하면 createCommentAction이 올바른 인자로 실행된다', async () => {
    const onSuccessCallback = vi.fn();
    const { result } = renderHook(() => useCreateComment(postId, onSuccessCallback), {
      wrapper: createWrapper(queryClient),
    });

    result.current.createComment('좋은 글 감사합니다!');

    await waitFor(() => expect(mockCreateCommentAction).toHaveBeenCalledWith({
      postId,
      content: '좋은 글 감사합니다!',
    }));
  });

  it('댓글 작성 성공 시 detailKey 캐시가 invalidate되고 onSuccessCallback과 성공 토스트가 실행된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useCreateComment(postId, onSuccessCallback), {
      wrapper: createWrapper(queryClient),
    });

    result.current.createComment('응원합니다.');

    await waitFor(() => expect(onSuccessCallback).toHaveBeenCalled());

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: postQueries.detailKey(postId) }),
    );
    expect(toast.success).toHaveBeenCalledWith('댓글이 작성되었습니다.');
  });

  it('댓글 작성 실패 시 에러 토스트가 표시된다', async () => {
    mockCreateCommentAction.mockRejectedValueOnce(new Error('댓글 작성 오류'));

    const { result } = renderHook(() => useCreateComment(postId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.createComment('실패할 댓글');

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });
});
