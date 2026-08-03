'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { DetailCard } from '../cards/detail-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function JoinedMeetingListContainer() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(meetingQueries.joinedListQuery());

  const meetings = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-6">
        <div className="h-44 w-full animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-44 w-full animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <p className="text-slate-500 text-lg font-medium">
          아직 참여한 모임이 없습니다.
        </p>
        <Link href="/meetings">
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

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '불러오는 중...' : '더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}
