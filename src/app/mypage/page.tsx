import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { MyPageView } from '@/features/profile/components/mypage-view';

interface MyPageProps {
  searchParams: Promise<{ tab?: string }>;
}

const TAB_PREFETCH_MAP: Record<
  string,
  (qc: QueryClient) => Promise<unknown>
> = {
  joined: (qc) =>
    qc.prefetchInfiniteQuery(
      meetingQueries.joinedListQuery({}, async () => {
        const res = await ServerApi.meetings.getJoinedMeetings({
          teamId: TEAM_ID,
          size: 10,
        });
        return res.data;
      }),
    ),
};

export default async function MyPage({ searchParams }: MyPageProps) {
  const { tab = 'joined' } = await searchParams;
  const queryClient = new QueryClient();

  // 유입된 탭 1개만 사전 페칭 (단 1줄로 지저분한 if/else chain 제거)
  const prefetcher = TAB_PREFETCH_MAP[tab] || TAB_PREFETCH_MAP.joined;
  await prefetcher(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageView />
    </HydrationBoundary>
  );
}
