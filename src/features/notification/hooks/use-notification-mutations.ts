import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import {
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
} from '@/actions/notification/notification-actions';
import { unwrapAction } from '@/lib/safe-action';
import { notificationQueries } from '../queries/notification-query';
import { NotificationList } from '@/api/data-contracts';

export function useMarkNotificationAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return unwrapAction(await markNotificationAsReadAction({ notificationId }));
    },
    onMutate: async (notificationId) => {
      // 0ms 낙관적 업데이트: unread-count 1 감소
      queryClient.setQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
        (old) => (old ? { count: Math.max(0, old.count - 1) } : old),
      );

      // 0ms 낙관적 업데이트: 목록에서 해당 알림 isRead = true
      queryClient.setQueriesData<{ pages?: NotificationList[] }>(
        { queryKey: notificationQueries.listKeys() },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              const target = page.data?.find((item) => item.id === notificationId);
              if (target) {
                target.isRead = true;
              }
            });
          }),
      );
    },
  });
}

export function useMarkAllNotificationsAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return unwrapAction(await markAllNotificationsAsReadAction());
    },
    onMutate: async () => {
      // 0ms 낙관적 업데이트: unread-count 0 변경
      queryClient.setQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
        { count: 0 },
      );

      // 0ms 낙관적 업데이트: 목록 전체 isRead = true
      queryClient.setQueriesData<{ pages?: NotificationList[] }>(
        { queryKey: notificationQueries.listKeys() },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              page.data?.forEach((item) => {
                item.isRead = true;
              });
            });
          }),
      );
    },
  });
}
