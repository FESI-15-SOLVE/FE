'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { MyPageTabNavigation } from './mypage-tab-navigation';
import { JoinedMeetingListContainer } from '@/features/meeting/components/joined-meeting-list/joined-meeting-list-container';
import { CreatedMeetingListContainer } from '@/features/meeting/components/created-meeting-list/created-meeting-list-container';
import { MyReviewTabContainer } from '@/features/review/components/my-review-tab-container';

export function MyPageView() {
  const [tab] = useQueryState(
    'tab',
    parseAsString.withDefault('joined'),
  );

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4">
      <MyPageTabNavigation />

      {tab === 'joined' && <JoinedMeetingListContainer />}
      {tab === 'created' && <CreatedMeetingListContainer />}
      {tab === 'reviews' && <MyReviewTabContainer />}
    </div>
  );
}
