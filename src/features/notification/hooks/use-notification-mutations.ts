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
    meta: {
      errorMessage: '알림 읽음 처리에 실패했습니다.',
    },
    onMutate: async (notificationId) => {
      // 1. 진행 중인 백그라운드 재요청 취소 (경쟁 상태 방지)
      await queryClient.cancelQueries({
        queryKey: notificationQueries.unreadCountKey(),
      });
      await queryClient.cancelQueries({
        queryKey: notificationQueries.listKeys(),
      });

      // 2. 이전 캐시 데이터 스냅샷 캡처 (롤백용)
      const prevCount = queryClient.getQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
      );
      const prevList = queryClient.getQueriesData<{ pages?: NotificationList[] }>({
        queryKey: notificationQueries.listKeys(),
      });

      // 3. 0ms 낙관적 업데이트: unread-count 1 감소
      queryClient.setQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
        (old) => (old ? { count: Math.max(0, old.count - 1) } : old),
      );

      // 4. 0ms 낙관적 업데이트: 목록에서 해당 알림 isRead = true (undefined 가드 추가)
      queryClient.setQueriesData<{ pages?: NotificationList[] }>(
        { queryKey: notificationQueries.listKeys() },
        (old) => {
          if (!old) return old; // old가 undefined인 경우 Immer 크래시 방지
          return produce(old, (draft) => {
            draft.pages?.forEach((page) => {
              const target = page.data?.find((item) => item.id === notificationId);
              if (target) {
                target.isRead = true;
              }
            });
          });
        },
      );

      return { prevCount, prevList };
    },
    onError: (_err, _notificationId, context) => {
      // 실패 시 이전 스냅샷으로 롤백
      if (context?.prevCount !== undefined) {
        queryClient.setQueryData(
          notificationQueries.unreadCountKey(),
          context.prevCount,
        );
      }
      context?.prevList?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      // 최종 동기화
      queryClient.invalidateQueries({
        queryKey: notificationQueries.unreadCountKey(),
      });
    },
  });
}

export function useMarkAllNotificationsAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return unwrapAction(await markAllNotificationsAsReadAction());
    },
    meta: {
      errorMessage: '전체 알림 읽음 처리에 실패했습니다.',
    },
    onMutate: async () => {
      // 1. 진행 중인 백그라운드 재요청 취소 (경쟁 상태 방지)
      await queryClient.cancelQueries({
        queryKey: notificationQueries.unreadCountKey(),
      });
      await queryClient.cancelQueries({
        queryKey: notificationQueries.listKeys(),
      });

      // 2. 이전 캐시 데이터 스냅샷 캡처 (롤백용)
      const prevCount = queryClient.getQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
      );
      const prevList = queryClient.getQueriesData<{ pages?: NotificationList[] }>({
        queryKey: notificationQueries.listKeys(),
      });

      // 3. 0ms 낙관적 업데이트: unread-count 0 변경
      queryClient.setQueryData<{ count: number }>(
        notificationQueries.unreadCountKey(),
        { count: 0 },
      );

      // 4. 0ms 낙관적 업데이트: 목록 전체 isRead = true (undefined 가드 추가)
      queryClient.setQueriesData<{ pages?: NotificationList[] }>(
        { queryKey: notificationQueries.listKeys() },
        (old) => {
          if (!old) return old; // old가 undefined인 경우 Immer 크래시 방지
          return produce(old, (draft) => {
            draft.pages?.forEach((page) => {
              page.data?.forEach((item) => {
                item.isRead = true;
              });
            });
          });
        },
      );

      return { prevCount, prevList };
    },
    onError: (_err, _variables, context) => {
      // 실패 시 이전 스냅샷으로 롤백
      if (context?.prevCount !== undefined) {
        queryClient.setQueryData(
          notificationQueries.unreadCountKey(),
          context.prevCount,
        );
      }
      context?.prevList?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      // 최종 동기화
      queryClient.invalidateQueries({
        queryKey: notificationQueries.unreadCountKey(),
      });
    },
  });
}
