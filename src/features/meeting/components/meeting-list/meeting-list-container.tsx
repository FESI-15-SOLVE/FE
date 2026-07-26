import { Suspense } from 'react';
import { MeetingBanner } from '../banner';
import { MeetingListSkeleton } from './meeting-list-skeleton';
import { SuspensefulMeetingList } from './meeting-list';
import { MeetingFilterSection } from '../filter/meeting-filter-section';
import { CreateMeetingFloatingButton } from '../create-meeting/create-meeting-floating-button';
import { ClientErrorBoundary } from '@/components/ui/error/client-error-boundary';

export function MeetingListContainer() {
  return (
    <div className="flex flex-col gap-6 w-full px-4 py-8 relative min-h-screen">
      <MeetingBanner />

      <MeetingFilterSection />

      <ClientErrorBoundary>
        <Suspense fallback={<MeetingListSkeleton />}>
          <SuspensefulMeetingList />
        </Suspense>
      </ClientErrorBoundary>
      <CreateMeetingFloatingButton />
    </div>
  );
}
