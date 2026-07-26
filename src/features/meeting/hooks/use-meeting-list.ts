'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { TEAM_ID } from '@/constants/api';
import { meetingSearchParams } from '../schema';
import { meetingQueries } from '../queries/meeting-query';

export function useMeetingList(teamId: string = TEAM_ID) {
  const [filters, setFilters] = useQueryStates(meetingSearchParams);

  const query = useSuspenseInfiniteQuery(
    meetingQueries.listQuery(teamId, filters),
  );

  const meetings = query.data.pages.flatMap((page) => page.data ?? []);
  return {
    meetings,
    filters,
    setFilters,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
}
