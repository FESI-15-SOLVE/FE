import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useJoinMeeting } from '../use-join-meeting';
import { meetingQueries } from '../../queries/meeting-query';
import { createMockMeeting } from '@/__mocks__/fixtures';
import { createAppQueryClient } from '@/providers/query-provider';

// toast 모킹
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

// server actions 모킹
vi.mock('@/actions/meeting/meeting-actions', () => ({
  joinMeetingAction: vi.fn().mockResolvedValue({ data: {} }),
  leaveMeetingAction: vi.fn().mockResolvedValue({ data: {} }),
}));

// unwrapAction은 실제 구현 사용 (serverError 시 throw하는 로직이 핵심)
vi.mock('@/lib/safe-action', async (importOriginal) => {
  return await importOriginal();
});

import { toast } from 'sonner';
import { joinMeetingAction, leaveMeetingAction } from '@/actions/meeting/meeting-actions';

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  };
}

describe('useJoinMeeting 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('참여하지 않은 모임에 mutate 호출 시 joinMeetingAction이 실행된다', async () => {
    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 1, isJoined: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(joinMeetingAction).toHaveBeenCalledWith({ meetingId: 1 });
  });

  it('이미 참여한 모임에 mutate 호출 시 leaveMeetingAction이 실행된다', async () => {
    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 2, isJoined: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(leaveMeetingAction).toHaveBeenCalledWith({ meetingId: 2 });
  });

  it('참여 신청 성공 시 "참여 신청이 완료되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 10, isJoined: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('참여 신청이 완료되었습니다.');
  });

  it('참여 취소 성공 시 "참여가 취소되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 10, isJoined: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('참여가 취소되었습니다.');
  });

  it('성공 시 detailKey 캐시가 isJoined 반전 및 participantCount 증가로 업데이트된다', async () => {
    const meeting = createMockMeeting({ id: 5, isJoined: false, participantCount: 3 });
    queryClient.setQueryData(meetingQueries.detailKey(5), meeting);

    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 5, isJoined: false });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(meetingQueries.detailKey(5)) as typeof meeting;
    expect(cached.isJoined).toBe(true);
    expect(cached.participantCount).toBe(4);
  });

  it('참여 취소 성공 시 participantCount가 감소하고 isJoined가 false로 업데이트된다', async () => {
    const meeting = createMockMeeting({ id: 6, isJoined: true, participantCount: 5 });
    queryClient.setQueryData(meetingQueries.detailKey(6), meeting);

    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 6, isJoined: true });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const cached = queryClient.getQueryData(meetingQueries.detailKey(6)) as typeof meeting;
    expect(cached.isJoined).toBe(false);
    expect(cached.participantCount).toBe(4);
  });

  it('API 호출 실패 시 에러 토스트가 표시된다', async () => {
    vi.mocked(joinMeetingAction).mockRejectedValueOnce(new Error('네트워크 오류'));

    const { result } = renderHook(() => useJoinMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 99, isJoined: false });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
