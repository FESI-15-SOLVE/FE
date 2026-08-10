import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries, JOINED_WRITABLE_PARAMS } from '@/features/meeting/queries/meeting-query';
import { reviewQueries } from '@/features/review/queries/review-query';

/** 나의 모임 탭 (JoinedMeetingListContainer) 서버 프리페치 */
export async function prefetchJoinedMeetings(queryClient: QueryClient) {
  await queryClient.prefetchInfiniteQuery(
    meetingQueries.joinedListQuery(undefined, async () => {
      const res = await ServerApi.meetings.getJoinedMeetings({
        teamId: TEAM_ID,
        size: 10,
      });
      return res.data;
    }),
  );
}

/** 작성 가능한 리뷰 탭 (SuspensefulWritableReviewList) 서버 프리페치 */
export async function prefetchWritableMeetings(queryClient: QueryClient) {
  await queryClient.prefetchInfiniteQuery(
    meetingQueries.joinedListQuery(
      JOINED_WRITABLE_PARAMS,
      async () => {
        const res = await ServerApi.meetings.getJoinedMeetings({
          teamId: TEAM_ID,
          ...JOINED_WRITABLE_PARAMS,
          size: 10,
        });
        return res.data;
      },
    ),
  );
}

/** 작성한 리뷰 탭 (SuspensefulWrittenReviewList) 서버 프리페치 */
export async function prefetchMyWrittenReviews(queryClient: QueryClient) {
  await queryClient.prefetchInfiniteQuery(
    reviewQueries.myWrittenListQuery(async () => {
      const res = await ServerApi.users.getMyReviews({
        teamId: TEAM_ID,
        size: 10,
      });
      return res.data;
    }),
  );
}
