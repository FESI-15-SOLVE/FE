import { clientApi } from '@/lib/client-api';
import { NotificationList, GetNotificationsParams } from '@/api/data-contracts';

export async function fetchUnreadCount(): Promise<{ count: number }> {
  const res = await clientApi.get<{ count: number }>('/notifications/unread-count');
  return res.data;
}

export async function fetchNotifications(
  params?: Partial<GetNotificationsParams>,
  cursor?: string,
  size: number = 10,
): Promise<NotificationList> {
  const res = await clientApi.get<NotificationList>('/notifications', {
    params: {
      ...params,
      cursor,
      size,
    },
  });
  return res.data;
}
