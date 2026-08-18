import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUpdateMeeting, useCancelMeeting } from '../use-host-meeting-actions';
import { meetingQueries } from '../../queries/meeting-query';
import { EditMeetingPayload } from '../../schema/edit-meeting-schema';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock('@/actions/meeting/meeting-actions', () => ({
  cancelMeetingAction: vi.fn().mockResolvedValue({ data: {} }),
}));

vi.mock('@/lib/safe-action', async (importOriginal) => {
  return await importOriginal();
});

const mockUpdateMeeting = vi.fn().mockResolvedValue({});
vi.mock('../../api/update-meeting', () => ({
  updateMeeting: (...args: unknown[]) => mockUpdateMeeting(...args),
}));

vi.mock('@/features/notification/queries/notification-query', () => ({
  notificationQueries: {
    all: () => ['notifications'],
    unreadCountKey: () => ['notifications', 'unread-count'],
  },
}));

import { toast } from 'sonner';
import { cancelMeetingAction } from '@/actions/meeting/meeting-actions';

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useUpdateMeeting 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 updateMeeting API가 올바른 인자로 실행된다', async () => {
    const payload = { name: '수정된 모임', capacity: 10 } as unknown as EditMeetingPayload;

    const { result } = renderHook(() => useUpdateMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 5, payload });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockUpdateMeeting).toHaveBeenCalledWith(5, payload);
  });

  it('수정 성공 시 "모임 정보가 수정되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useUpdateMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 5, payload: { name: '모임' } as EditMeetingPayload });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('모임 정보가 수정되었습니다.');
  });

  it('수정 실패 시 에러 토스트가 표시된다', async () => {
    mockUpdateMeeting.mockRejectedValueOnce(new Error('서버 오류'));

    const { result } = renderHook(() => useUpdateMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 5, payload: { name: '모임' } as EditMeetingPayload });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});

describe('useCancelMeeting 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 cancelMeetingAction이 올바른 meetingId로 실행된다', async () => {
    const { result } = renderHook(() => useCancelMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 99 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cancelMeetingAction).toHaveBeenCalledWith({ meetingId: 99 });
  });

  it('취소 성공 시 "모임이 취소되었습니다." 토스트가 표시된다', async () => {
    const { result } = renderHook(() => useCancelMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 99 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('모임이 취소되었습니다.');
  });

  it('취소 성공 시 detailKey와 listKeys가 invalidate된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCancelMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 7 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const detailKey = meetingQueries.detailKey(7);
    const listKeys = meetingQueries.listKeys();

    expect(invalidateSpy).toHaveBeenCalledWith(expect.objectContaining({ queryKey: detailKey }));
    expect(invalidateSpy).toHaveBeenCalledWith(expect.objectContaining({ queryKey: listKeys }));
  });

  it('취소 실패 시 에러 토스트가 표시된다', async () => {
    vi.mocked(cancelMeetingAction).mockRejectedValueOnce(new Error('취소 불가'));

    const { result } = renderHook(() => useCancelMeeting(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ meetingId: 99 });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
