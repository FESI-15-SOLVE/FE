import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { SavedMeetingListContainer } from '@/features/meeting/components/saved-meeting-list/saved-meeting-list-container';
import { ServerApi } from '@/api/server-api';
import { meetingSearchParamsCache } from '@/features/meeting/schema/meeting-search-params';
import { TEAM_ID } from '@/constants/api';
import { favoriteQueries } from '@/features/meeting/queries/favorite-query';
import { mapFiltersToQueryParams } from '@/features/meeting/utils/filter-mapper';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SavedPage({ searchParams }: PageProps) {
  const filters = meetingSearchParamsCache.parse(await searchParams);
  const queryClient = getQueryClient();

  const queryParams = mapFiltersToQueryParams(filters);

  await queryClient.prefetchInfiniteQuery(
    favoriteQueries.listQuery(TEAM_ID, queryParams, async () => {
      const res = await ServerApi.favorites.getFavorites({
        teamId: TEAM_ID,
        ...queryParams,
      });
      return res.data;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SavedMeetingListContainer />
    </HydrationBoundary>
  );
}
