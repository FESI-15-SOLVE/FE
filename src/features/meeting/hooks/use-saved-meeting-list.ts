'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { meetingSearchParams } from '../schema/meeting-search-params';
import { favoriteQueries } from '../queries/favorite-query';
import { TEAM_ID } from '@/constants/api';
import { FavoriteWithMeeting } from '@/api/data-contracts';
import { mapFiltersToQueryParams } from '../utils/filter-mapper';

export function useSavedMeetingList(teamId: string = TEAM_ID) {
  const [filters, setFilters] = useQueryStates(meetingSearchParams);
  const queryParams = mapFiltersToQueryParams(filters);

  const query = useSuspenseInfiniteQuery(
    favoriteQueries.listQuery(teamId, queryParams),
  );

  const meetings =
    query.data.pages.flatMap((page) =>
      (page.data ?? []).map((fav: FavoriteWithMeeting) => ({
        ...fav.meeting,
        isFavorited: true,
      })),
    ) ?? [];

  return {
    meetings,
    filters,
    setFilters,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
}
