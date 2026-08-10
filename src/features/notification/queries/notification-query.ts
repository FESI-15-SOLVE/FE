import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchNotifications, fetchUnreadCount } from '../api/fetch-notifications';
import { NotificationList, GetNotificationsParams } from '@/api/data-contracts';

export const notificationQueries = {
  all: () => ['notifications'] as const,

  unreadCountKey: () => [...notificationQueries.all(), 'unread-count'] as const,

  listKeys: () => [...notificationQueries.all(), 'list'] as const,
  listKey: (params?: Partial<GetNotificationsParams>) =>
    [...notificationQueries.listKeys(), params ?? {}] as const,

  /** 읽지 않은 알림 개수 쿼리 (동적 폴링: 기본 30초, 새 알림 수 증가 시 12초) */
  unreadCountQuery: (lastCountRef?: { current: number }) =>
    queryOptions({
      queryKey: notificationQueries.unreadCountKey(),
      queryFn: fetchUnreadCount,
      refetchInterval: (query) => {
        const currentCount = query.state.data?.count ?? 0;
        const prevCount = lastCountRef?.current ?? 0;
        if (lastCountRef) {
          lastCountRef.current = currentCount;
        }
        if (currentCount > prevCount && prevCount > 0) {
          return 12000; // 새 알림 감지 시 12초
        }
        return 30000; // 기본 30초
      },
      refetchIntervalInBackground: false, // 탭 hidden 시 폴링 정지
      refetchOnWindowFocus: true, // 탭 복귀 시 1회 즉시 갱신
      retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 120000), // 지수 백오프 (최대 2분)
    }),

  /** 알림 목록 쿼리 (드롭다운/시트 Open 시 enabled) */
  listQuery: (params?: Partial<GetNotificationsParams>, isOpen: boolean = false) =>
    infiniteQueryOptions({
      queryKey: notificationQueries.listKey(params),
      queryFn: (async ({ pageParam }) =>
        fetchNotifications(params, pageParam ? String(pageParam) : undefined)),
      getNextPageParam: (lastPage: NotificationList) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
      enabled: isOpen,
    }),
};
