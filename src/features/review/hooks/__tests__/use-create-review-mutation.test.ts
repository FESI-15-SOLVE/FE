import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCreateReviewMutation, CreateReviewPayload } from '../use-create-review-mutation';
import { meetingQueries, JOINED_WRITABLE_PARAMS } from '@/features/meeting/queries/meeting-query';
import { reviewQueries } from '../../queries/review-query';
import { createAppQueryClient } from '@/providers/query-provider';
import { JoinedMeeting } from '@/api/data-contracts';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockCreateReviewAction = vi.fn().mockResolvedValue({ data: { id: 1 } });
vi.mock('@/actions/review/review-actions', () => ({
  createReviewAction: (payload: unknown) => mockCreateReviewAction(payload),
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

describe('useCreateReviewMutation 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 createReviewAction이 올바른 페이로드로 실행된다', async () => {
    const payload: CreateReviewPayload = {
      meetingId: 50,
      score: 5,
      comment: '정말 유익한 모임이었습니다!',
    };

    const { result } = renderHook(() => useCreateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockCreateReviewAction).toHaveBeenCalledWith(payload);
  });

  it('리뷰 작성 성공 시 "작성 가능한 리뷰" 캐시에서 해당 모임이 즉시 제거된다', async () => {
    const writableKey = meetingQueries.joinedListKey(JOINED_WRITABLE_PARAMS);
    const mockPages = {
      pages: [
        {
          data: [
            { id: 50, name: '리뷰할 모임' },
            { id: 51, name: '다른 모임' },
          ] as unknown as JoinedMeeting[],
        },
      ],
    };
    queryClient.setQueryData(writableKey, mockPages);

    const { result } = renderHook(() => useCreateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 50, score: 5, comment: '최고였습니다' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(writableKey) as typeof mockPages;
    expect(cached.pages[0].data).toHaveLength(1);
    expect(cached.pages[0].data[0].id).toBe(51);
  });

  it('리뷰 작성 성공 시 "나의 모임" 캐시에서 해당 모임의 isReviewed가 true로 즉시 변경된다', async () => {
    const myMeetingKey = meetingQueries.joinedListKey(undefined);
    const mockPages = {
      pages: [
        {
          data: [
            { id: 50, name: '참여한 모임', isReviewed: false },
          ] as unknown as JoinedMeeting[],
        },
      ],
    };
    queryClient.setQueryData(myMeetingKey, mockPages);

    const { result } = renderHook(() => useCreateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 50, score: 5, comment: '재밌었어요' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(myMeetingKey) as typeof mockPages;
    expect(cached.pages[0].data[0].isReviewed).toBe(true);
  });

  it('리뷰 작성 성공 시 myWrittenListKeys 쿼리가 reset되고 성공 토스트가 노출된다', async () => {
    const resetSpy = vi.spyOn(queryClient, 'resetQueries');

    const { result } = renderHook(() => useCreateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 50, score: 4, comment: '좋았어요' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(resetSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: reviewQueries.myWrittenListKeys() }),
    );
    expect(toast.success).toHaveBeenCalledWith('리뷰가 성공적으로 작성되었습니다.');
  });

  it('리뷰 작성 실패 시 에러 토스트가 표시된다', async () => {
    mockCreateReviewAction.mockRejectedValueOnce(new Error('리뷰 작성 불가'));

    const { result } = renderHook(() => useCreateReviewMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 50, score: 1, comment: '별로예요' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
