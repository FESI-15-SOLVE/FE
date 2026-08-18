import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUpdateComment } from '../use-update-comment';
import { postQueries } from '../../queries/post-query';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockUpdateCommentAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/post/post-actions', () => ({
  updateCommentAction: (params: unknown) => mockUpdateCommentAction(params),
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

describe('useUpdateComment 훅', () => {
  let queryClient: QueryClient;
  const postId = 10;
  const commentId = 20;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('공백 문자열만 입력 시 에러 토스트를 표시하고 API를 호출하지 않는다', () => {
    const { result } = renderHook(() => useUpdateComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.updateComment('   ');

    expect(toast.error).toHaveBeenCalledWith('댓글 내용을 입력해 주세요.');
    expect(mockUpdateCommentAction).not.toHaveBeenCalled();
  });

  it('유효한 내용을 입력하면 updateCommentAction이 올바른 인자로 실행된다', async () => {
    const { result } = renderHook(() => useUpdateComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.updateComment('수정된 댓글 내용');

    await waitFor(() => expect(mockUpdateCommentAction).toHaveBeenCalledWith({
      postId,
      commentId,
      content: '수정된 댓글 내용',
    }));
  });

  it('댓글 수정 성공 시 detailKey 캐시가 invalidate되고 onSuccessCallback과 성공 토스트가 표시된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useUpdateComment(postId, commentId, onSuccessCallback), {
      wrapper: createWrapper(queryClient),
    });

    result.current.updateComment('수정 성공 댓글');

    await waitFor(() => expect(onSuccessCallback).toHaveBeenCalled());

    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: postQueries.detailKey(postId) }),
    );
    expect(toast.success).toHaveBeenCalledWith('댓글이 수정되었습니다.');
  });

  it('댓글 수정 실패 시 에러 토스트가 표시된다', async () => {
    mockUpdateCommentAction.mockRejectedValueOnce(new Error('수정 실패'));

    const { result } = renderHook(() => useUpdateComment(postId, commentId), {
      wrapper: createWrapper(queryClient),
    });

    result.current.updateComment('실패 댓글');

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });
});
