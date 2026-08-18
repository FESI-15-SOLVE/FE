import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUpdateReviewMutation, UpdateReviewPayload } from '../use-update-review-mutation';
import { reviewQueries } from '../../queries/review-query';
import { createAppQueryClient } from '@/providers/query-provider';
import { UserReviewsResponse, UserReview } from '@/api/data-contracts';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockUpdateReviewAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/review/review-actions', () => ({
  updateReviewAction: (payload: unknown) => mockUpdateReviewAction(payload),
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

describe('useUpdateReviewMutation 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 updateReviewAction이 올바른 페이로드로 실행된다', async () => {
    const payload: UpdateReviewPayload = {
      reviewId: 88,
      score: 5,
      comment: '수정된 유익한 리뷰입니다.',
    };

    const { result } = renderHook(() => useUpdateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpdateReviewAction).toHaveBeenCalledWith(payload);
  });

  it('리뷰 수정 성공 시 캐시의 해당 리뷰 항목의 score와 comment가 정밀 패치된다', async () => {
    const writtenKey = reviewQueries.myWrittenListKeys();
    const mockPages: { pages: UserReviewsResponse[] } = {
      pages: [
        {
          data: [
            { id: 88, score: 3, comment: '원래 리뷰' } as unknown as UserReview,
            { id: 89, score: 4, comment: '다른 리뷰' } as unknown as UserReview,
          ],
          nextCursor: null,
          hasMore: false,
        },
      ],
    };
    queryClient.setQueryData(writtenKey, mockPages);

    const { result } = renderHook(() => useUpdateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      reviewId: 88,
      score: 5,
      comment: '수정된 아주 좋은 리뷰',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(writtenKey) as typeof mockPages;
    const updated = cached.pages[0].data.find((r) => r.id === 88);
    expect(updated?.score).toBe(5);
    expect(updated?.comment).toBe('수정된 아주 좋은 리뷰');
    expect(toast.success).toHaveBeenCalledWith('리뷰가 수정되었습니다.');
  });

  it('리뷰 수정 실패 시 에러 토스트가 표시된다', async () => {
    mockUpdateReviewAction.mockRejectedValueOnce(new Error('수정 불가'));

    const { result } = renderHook(() => useUpdateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ reviewId: 88, score: 1, comment: '실패' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
