import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { MeetingListContainer } from '@/features/meeting/components/meeting-list/meeting-list-container';
import { ServerApi } from '@/api/server-api';
import { meetingSearchParamsCache } from '@/features/meeting/schema/meeting-search-params';
import { TEAM_ID } from '@/constants/api';
import { meetingQueries } from '@/features/meeting/queries/meeting-query';
import { mapFiltersToQueryParams } from '@/features/meeting/utils/filter-mapper';

export const metadata: Metadata = {
  title: '모임 찾기',
  description: '다양한 관심사의 온·오프라인 모임을 탐색해보세요.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MeetingsPage({ searchParams }: PageProps) {
  const filters = meetingSearchParamsCache.parse(await searchParams);
  const queryClient = getQueryClient();

  const queryParams = mapFiltersToQueryParams(filters, {
    defaultToCurrentDate: true,
  });

  await queryClient.prefetchInfiniteQuery(
    meetingQueries.listQuery(TEAM_ID, filters, async () => {
      const res = await ServerApi.meetings.getMeetings({
        teamId: TEAM_ID,
        ...queryParams,
      });
      return res.data;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeetingListContainer />
    </HydrationBoundary>
  );
}
