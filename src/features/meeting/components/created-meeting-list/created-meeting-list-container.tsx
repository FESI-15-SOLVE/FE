'use client';

import { Suspense } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { DetailCard } from '../cards/detail-card';
import { EmptyState } from '@/components/ui/empty/empty';
import { ClientErrorBoundary } from '@/components/ui/error/client-error-boundary';
import { ReviewListSkeleton } from '@/features/review/components/review-list-skeleton';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

function SuspensefulCreatedMeetingList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(meetingQueries.createdListQuery());

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const meetings = data.pages.flatMap((page) => page.data ?? []);

  if (meetings.length === 0) {
    return (
      <div className="py-16">
        <EmptyState message="아직 내가 만든 모임이 없어요" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {meetings.map((meeting) => (
        <DetailCard key={meeting.id} meeting={meeting} showActionButton={false} />
      ))}

      <div
        ref={observerRef}
        className="h-10 flex items-center justify-center py-4"
      >
        {isFetchingNextPage && (
          <p className="text-sm text-slate-500 animate-pulse">
            내가 만든 모임을 불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
}

export function CreatedMeetingListContainer() {
  return (
    <ClientErrorBoundary>
      <Suspense fallback={<ReviewListSkeleton />}>
        <SuspensefulCreatedMeetingList />
      </Suspense>
    </ClientErrorBoundary>
  );
}
