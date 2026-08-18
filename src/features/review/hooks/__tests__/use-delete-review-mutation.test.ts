import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useDeleteReviewMutation, DeleteReviewPayload } from '../use-delete-review-mutation';
import { reviewQueries } from '../../queries/review-query';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { createAppQueryClient } from '@/providers/query-provider';
import { UserReviewsResponse, UserReview } from '@/api/data-contracts';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockDeleteReviewAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/review/review-actions', () => ({
  deleteReviewAction: (payload: unknown) => mockDeleteReviewAction(payload),
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

describe('useDeleteReviewMutation 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 deleteReviewAction이 올바른 reviewId로 실행된다', async () => {
    const payload: DeleteReviewPayload = { reviewId: 77 };

    const { result } = renderHook(() => useDeleteReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockDeleteReviewAction).toHaveBeenCalledWith(payload);
  });

  it('리뷰 삭제 성공 시 내 리뷰 캐시에서 해당 reviewId가 즉시 제거된다', async () => {
    const writtenKey = reviewQueries.myWrittenListKeys();
    const mockPages: { pages: UserReviewsResponse[] } = {
      pages: [
        {
          data: [
            { id: 77, score: 5, comment: '삭제할 리뷰' } as unknown as UserReview,
            { id: 78, score: 4, comment: '남아있을 리뷰' } as unknown as UserReview,
          ],
          nextCursor: null,
          hasMore: false,
        },
      ],
    };
    queryClient.setQueryData(writtenKey, mockPages);

    const { result } = renderHook(() => useDeleteReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ reviewId: 77 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(writtenKey) as typeof mockPages;
    expect(cached.pages[0].data).toHaveLength(1);
    expect(cached.pages[0].data[0].id).toBe(78);
  });

  it('리뷰 삭제 성공 시 joinedListKeys 쿼리가 reset되고 성공 토스트가 표시된다', async () => {
    const resetSpy = vi.spyOn(queryClient, 'resetQueries');

    const { result } = renderHook(() => useDeleteReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ reviewId: 77 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(resetSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: meetingQueries.joinedListKeys() }),
    );
    expect(toast.success).toHaveBeenCalledWith('리뷰가 삭제되었습니다.');
  });

  it('리뷰 삭제 실패 시 에러 토스트가 표시된다', async () => {
    mockDeleteReviewAction.mockRejectedValueOnce(new Error('리뷰 삭제 실패'));

    const { result } = renderHook(() => useDeleteReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ reviewId: 77 });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
