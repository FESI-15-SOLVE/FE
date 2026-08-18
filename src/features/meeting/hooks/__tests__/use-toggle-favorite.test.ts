import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useToggleFavorite } from '../use-toggle-favorite';
import { meetingQueries } from '../../queries/meeting-query';
import { favoriteQueries } from '../../queries/favorite-query';
import { createMockMeeting } from '@/__mocks__/fixtures';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockAddFavoriteApi = vi.fn().mockResolvedValue(undefined);
const mockRemoveFavoriteApi = vi.fn().mockResolvedValue(undefined);

vi.mock('../../api/toggle-favorite', () => ({
  addFavoriteApi: () => mockAddFavoriteApi(),
  removeFavoriteApi: () => mockRemoveFavoriteApi(),
}));

import { toast } from 'sonner';

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useToggleFavorite 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('찜하지 않은 모임에 mutate 호출 시 addFavoriteApi가 실행된다', async () => {
    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 1, isSaved: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockAddFavoriteApi).toHaveBeenCalledTimes(1);
    expect(mockRemoveFavoriteApi).not.toHaveBeenCalled();
  });

  it('이미 찜한 모임에 mutate 호출 시 removeFavoriteApi가 실행된다', async () => {
    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 2, isSaved: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockRemoveFavoriteApi).toHaveBeenCalledTimes(1);
    expect(mockAddFavoriteApi).not.toHaveBeenCalled();
  });

  it('찜하기 성공 시 "찜 목록에 추가되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 1, isSaved: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('찜 목록에 추가되었습니다.');
  });

  it('찜 취소 성공 시 "찜 목록에서 삭제되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 2, isSaved: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('찜 목록에서 삭제되었습니다.');
  });

  it('onMutate 시 상세 캐시가 낙관적으로 isFavorited 반전 업데이트된다', async () => {
    const meeting = createMockMeeting({ id: 10, isFavorited: false });
    queryClient.setQueryData(meetingQueries.detailKey(10), meeting);

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 10, isSaved: false });

    // onMutate는 동기적으로 호출되므로 mutate 직후 캐시 확인 가능
    await waitFor(() => {
      const cached = queryClient.getQueryData(meetingQueries.detailKey(10)) as typeof meeting;
      return cached?.isFavorited === true;
    });

    const cached = queryClient.getQueryData(meetingQueries.detailKey(10)) as typeof meeting;
    expect(cached.isFavorited).toBe(true);
  });

  it('찜 카운트 캐시가 있을 때 찜하기 성공 시 count가 1 증가한다', async () => {
    queryClient.setQueryData(favoriteQueries.countKey(), { count: 3 });

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 20, isSaved: false });

    await waitFor(() => {
      const cached = queryClient.getQueryData(favoriteQueries.countKey()) as { count: number };
      return cached?.count === 4;
    });

    const cached = queryClient.getQueryData(favoriteQueries.countKey()) as { count: number };
    expect(cached.count).toBe(4);
  });

  it('찜 카운트 캐시가 있을 때 찜 취소 성공 시 count가 1 감소한다', async () => {
    queryClient.setQueryData(favoriteQueries.countKey(), { count: 5 });

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 21, isSaved: true });

    await waitFor(() => {
      const cached = queryClient.getQueryData(favoriteQueries.countKey()) as { count: number };
      return cached?.count === 4;
    });

    const cached = queryClient.getQueryData(favoriteQueries.countKey()) as { count: number };
    expect(cached.count).toBe(4);
  });

  it('API 실패 시 상세 캐시가 이전 값으로 롤백된다', async () => {
    mockAddFavoriteApi.mockRejectedValueOnce(new Error('네트워크 오류'));

    const meeting = createMockMeeting({ id: 30, isFavorited: false });
    queryClient.setQueryData(meetingQueries.detailKey(30), meeting);

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 30, isSaved: false });

    await waitFor(() => expect(result.current.isError).toBe(true));

    const cached = queryClient.getQueryData(meetingQueries.detailKey(30)) as typeof meeting;
    expect(cached.isFavorited).toBe(false);
    expect(toast.error).toHaveBeenCalled();
  });
});
