'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { DetailCard } from '../cards/detail-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export function JoinedMeetingListContainer() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery(meetingQueries.joinedListQuery());

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const meetings = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <div className="h-44 w-full animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-44 w-full animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <p className="text-slate-500 text-lg font-medium">
          참여한 모임 목록을 불러오는데 실패했습니다.
        </p>
        <Button variant="secondary" onClick={() => refetch()}>
          다시 시도
        </Button>
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <p className="text-slate-500 text-lg font-medium">
          아직 참여한 모임이 없습니다.
        </p>
        <Link href={ROUTES.MEETINGS.LIST}>
          <Button variant="primary">모임 둘러보기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {meetings.map((meeting) => (
        <DetailCard key={meeting.id} meeting={meeting} />
      ))}

      <div
        ref={observerRef}
        className="h-10 flex items-center justify-center py-4"
      >
        {isFetchingNextPage && (
          <p className="text-sm text-slate-500 animate-pulse">
            참여한 모임을 불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
}
