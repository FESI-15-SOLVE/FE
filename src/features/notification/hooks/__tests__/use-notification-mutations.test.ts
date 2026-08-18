import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from '../use-notification-mutations';
import { notificationQueries } from '../../queries/notification-query';
import { createAppQueryClient } from '@/providers/query-provider';
import { NotificationList, Notification } from '@/api/data-contracts';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockMarkReadAction = vi.fn().mockResolvedValue({ data: {} });
const mockMarkAllReadAction = vi.fn().mockResolvedValue({ data: {} });

vi.mock('@/actions/notification/notification-actions', () => ({
  markNotificationAsReadAction: (params: unknown) => mockMarkReadAction(params),
  markAllNotificationsAsReadAction: () => mockMarkAllReadAction(),
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

describe('useMarkNotificationAsReadMutation 훅', () => {
  let queryClient: QueryClient;
  const notificationId = 999;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('단일 알림 읽음 처리 시 unreadCount가 1 감소하고 isRead가 true로 낙관적 업데이트된다', async () => {
    queryClient.setQueryData(notificationQueries.unreadCountKey(), { count: 5 });
    const mockList: { pages: NotificationList[] } = {
      pages: [
        {
          data: [
            { id: notificationId, isRead: false } as unknown as Notification,
          ],
          hasMore: false,
          nextCursor: null,
        },
      ],
    };
    queryClient.setQueryData(notificationQueries.listKeys(), mockList);

    const { result } = renderHook(() => useMarkNotificationAsReadMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(notificationId);

    await waitFor(() => {
      const count = queryClient.getQueryData<{ count: number }>(notificationQueries.unreadCountKey());
      return count?.count === 4;
    });

    const count = queryClient.getQueryData<{ count: number }>(notificationQueries.unreadCountKey());
    expect(count?.count).toBe(4);
    expect(mockMarkReadAction).toHaveBeenCalledWith({ notificationId });
  });

  it('단일 알림 읽음 처리 실패 시 이전 count로 롤백된다', async () => {
    mockMarkReadAction.mockRejectedValueOnce(new Error('네트워크 오류'));
    queryClient.setQueryData(notificationQueries.unreadCountKey(), { count: 3 });

    const { result } = renderHook(() => useMarkNotificationAsReadMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(notificationId);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());

    const count = queryClient.getQueryData<{ count: number }>(notificationQueries.unreadCountKey());
    expect(count?.count).toBe(3);
  });
});

describe('useMarkAllNotificationsAsReadMutation 훅', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = createAppQueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
  });

  it('전체 알림 읽음 처리 시 unreadCount가 0으로 즉시 낙관적 업데이트된다', async () => {
    queryClient.setQueryData(notificationQueries.unreadCountKey(), { count: 10 });

    const { result } = renderHook(() => useMarkAllNotificationsAsReadMutation(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => {
      const count = queryClient.getQueryData<{ count: number }>(notificationQueries.unreadCountKey());
      return count?.count === 0;
    });

    expect(mockMarkAllReadAction).toHaveBeenCalled();
  });
});
