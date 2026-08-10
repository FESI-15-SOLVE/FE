import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import {
  fetchNotifications,
  fetchUnreadCount,
} from '../api/fetch-notifications';
import { NotificationList, GetNotificationsParams } from '@/api/data-contracts';

// 클라이언트 모듈 스코프 변수
let burstUntil = 0;
let lastKnownCount: number | undefined;

export const notificationQueries = {
  all: () => ['notifications'] as const,

  unreadCountKey: () => [...notificationQueries.all(), 'unread-count'] as const,

  listKeys: () => [...notificationQueries.all(), 'list'] as const,
  listKey: (params?: Partial<GetNotificationsParams>) =>
    [...notificationQueries.listKeys(), params ?? {}] as const,

  /** 읽지 않은 알림 개수 쿼리 (동적 폴링: 평소 30초, 새 알림 수신 시 3분간 10초 버스트) */
  unreadCountQuery: () =>
    queryOptions({
      queryKey: notificationQueries.unreadCountKey(),
      queryFn: async () => {
        const res = await fetchUnreadCount();

        // 이전 카운트가 존재하고, 새로운 카운트가 더 증가했다면 3분간(180,000ms) 10초 폴링 버스트
        if (lastKnownCount !== undefined && res.count > lastKnownCount) {
          burstUntil = Date.now() + 3 * 60 * 1000;
        }
        lastKnownCount = res.count;

        return res;
      },
      refetchInterval: () => (Date.now() < burstUntil ? 10000 : 30000), // 버스트 시 10초, 평소 30초
      refetchIntervalInBackground: false, // 탭 hidden 시 폴링 정지
      refetchOnWindowFocus: true, // 탭 복귀 시 1회 즉시 갱신
    }),

  /** 알림 목록 쿼리 (드롭다운/시트 Open 시 enabled, staleTime: Infinity 수동 통제) */
  listQuery: (
    params?: Partial<GetNotificationsParams>,
    isOpen: boolean = false,
  ) =>
    infiniteQueryOptions({
      queryKey: notificationQueries.listKey(params),
      queryFn: async ({ pageParam }) =>
        fetchNotifications(params, pageParam ? String(pageParam) : undefined),
      getNextPageParam: (lastPage: NotificationList) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
      enabled: isOpen,
      staleTime: Infinity, // 수동 통제: 열 때마다 무의미하게 자동 refetch 되는 현상 방지
    }),
};
