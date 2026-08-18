import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useCreateMeetingMutation } from '../use-create-meeting-mutation';
import { meetingQueries } from '../../queries/meeting-query';
import { CreateMeetingPayload } from '../../schema/create-shcema';
import { createAppQueryClient } from '@/providers/query-provider';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockCreateMeeting = vi.fn().mockResolvedValue({ id: 100 });
vi.mock('../../api/create-meeting', () => ({
  createMeeting: (...args: unknown[]) => mockCreateMeeting(...args),
}));

import { toast } from 'sonner';

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useCreateMeetingMutation 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('mutate 호출 시 createMeeting API가 올바른 페이로드로 실행된다', async () => {
    const payload = { name: '새로운 러닝 모임' } as unknown as CreateMeetingPayload;

    const { result } = renderHook(() => useCreateMeetingMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockCreateMeeting).toHaveBeenCalledWith(payload);
  });

  it('모임 생성 성공 시 "모임이 생성되었습니다." 토스트가 표시된다', async () => {
    const payload = { name: '새로운 러닝 모임' } as unknown as CreateMeetingPayload;

    const { result } = renderHook(() => useCreateMeetingMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(toast.success).toHaveBeenCalledWith('모임이 생성되었습니다.');
  });

  it('모임 생성 성공 시 meetingQueries.listKeys가 invalidate된다', async () => {
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const payload = { name: '새로운 러닝 모임' } as unknown as CreateMeetingPayload;

    const { result } = renderHook(() => useCreateMeetingMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const listKeys = meetingQueries.listKeys();
    expect(invalidateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: listKeys }),
    );
  });

  it('생성 실패 시 에러 토스트가 표시된다', async () => {
    mockCreateMeeting.mockRejectedValueOnce(new Error('네트워크 생성 오류'));

    const { result } = renderHook(() => useCreateMeetingMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({} as CreateMeetingPayload);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
