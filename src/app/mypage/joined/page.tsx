import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { JoinedMeetingListContainer } from '@/features/meeting/components/joined-meeting-list/joined-meeting-list-container';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';

export default async function JoinedPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    meetingQueries.joinedListQuery({}, async () => {
      const res = await ServerApi.meetings.getJoinedMeetings({
        teamId: TEAM_ID,
        size: 10,
      });
      return res.data;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JoinedMeetingListContainer />
    </HydrationBoundary>
  );
}
