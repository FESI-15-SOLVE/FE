import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { SavedMeetingListContainer } from '@/features/meeting/components/saved-meeting-list/saved-meeting-list-container';
import { ServerApi } from '@/api/server-api';
import { meetingSearchParamsCache } from '@/features/meeting/schema/meeting-search-params';
import { TEAM_ID } from '@/constants/api';
import { favoriteQueries } from '@/features/meeting/queries/favorite-query';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SavedPage({ searchParams }: PageProps) {
  const filters = meetingSearchParamsCache.parse(await searchParams);
  const queryClient = new QueryClient();

  const favoriteFilters = {
    type: filters.type || undefined,
  };

  await queryClient.prefetchInfiniteQuery(
    favoriteQueries.listQuery(TEAM_ID, favoriteFilters, async () => {
      const res = await ServerApi.favorites.getFavorites({
        teamId: TEAM_ID,
        ...favoriteFilters,
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
