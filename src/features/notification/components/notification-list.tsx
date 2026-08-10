'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { notificationQueries } from '../queries/notification-query';
import { NotificationTab } from './notification-tab';
import { EmptyState } from '@/components/ui/empty/empty';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface NotificationListProps {
  className?: string;
  isOpen?: boolean;
}

export function NotificationList({
  className,
  isOpen = false,
}: NotificationListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery(notificationQueries.listQuery({}, isOpen));

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const notifications = data?.pages.flatMap((p) => p.data ?? []) ?? [];

  // 캐시 재요청 중이거나 로딩 중일 때 스켈레톤 보장 (EmptyState 튀김 방지)
  if (isLoading || (isFetching && notifications.length === 0)) {
    return (
      <div className="flex flex-col gap-2 p-4 animate-pulse">
        <div className="h-16 w-full rounded-xl bg-slate-100" />
        <div className="h-16 w-full rounded-xl bg-slate-100" />
        <div className="h-16 w-full rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={cn('py-12', className)}>
        <EmptyState message="아직 알림이 없어요" />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {notifications.map((notif) => (
        <NotificationTab key={notif.id} data={notif} />
      ))}
      <div ref={observerRef} className="h-4" />
    </div>
  );
}
