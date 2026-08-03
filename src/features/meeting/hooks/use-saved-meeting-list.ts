'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { meetingSearchParams } from '../schema/meeting-search-params';
import { favoriteQueries } from '../queries/favorite-query';
import { TEAM_ID } from '@/constants/api';

import { FavoriteWithMeeting } from '@/api/data-contracts';

export function useSavedMeetingList() {
  const [type] = useQueryState('type', meetingSearchParams.type);

  const filters = {
    type: type || undefined,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(favoriteQueries.listQuery(TEAM_ID, filters));

  const meetings =
    data?.pages.flatMap((page) =>
      page.data.map((fav: FavoriteWithMeeting) => fav.meeting),
    ) ?? [];

  return {
    meetings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
