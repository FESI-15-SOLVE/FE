'use client';

import { Suspense } from 'react';
import { SavedBanner } from './saved-banner';
import { MeetingListUI } from '../meeting-list/meeting-list';
import { MeetingListSkeleton } from '../meeting-list/meeting-list-skeleton';
import { useSavedMeetingList } from '../../hooks/use-saved-meeting-list';
import { MeetingFilterSection } from '../filter/meeting-filter-section';
import { ClientErrorBoundary } from '@/components/ui/error/client-error-boundary';

export function SuspensefulSavedMeetingList() {
  const { meetings, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSavedMeetingList();

  return (
    <MeetingListUI
      meetings={meetings}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onFetchNextPage={fetchNextPage}
      emptyTitle="아직 찜한 모임이 없어요"
      emptyDescription="관심 있는 모임을 찜하고 한눈에 모아보세요!"
    />
  );
}

export function SavedMeetingListContainer() {
  return (
    <div className="flex flex-col gap-6 w-full px-4 py-8 relative min-h-screen">
      <SavedBanner />

      <MeetingFilterSection />

      <ClientErrorBoundary>
        <Suspense fallback={<MeetingListSkeleton />}>
          <SuspensefulSavedMeetingList />
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
}
