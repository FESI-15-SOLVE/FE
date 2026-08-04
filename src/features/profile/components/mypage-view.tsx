'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { MyPageTabNavigation } from './mypage-tab-navigation';
import { JoinedMeetingListContainer } from '@/features/meeting/components/joined-meeting-list/joined-meeting-list-container';

export function MyPageView() {
  const [tab] = useQueryState(
    'tab',
    parseAsString.withDefault('joined'),
  );

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4">
      <MyPageTabNavigation />

      {tab === 'joined' && <JoinedMeetingListContainer />}
      {tab === 'reviews' && (
        <div className="py-16 text-center text-slate-400 font-medium">
          준비 중인 서비스입니다 (나의 리뷰).
        </div>
      )}
      {tab === 'created' && (
        <div className="py-16 text-center text-slate-400 font-medium">
          준비 중인 서비스입니다 (내가 만든 모임).
        </div>
      )}
    </div>
  );
}
