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
  // 백엔드 스웨거 명세에는 isFavorited가 오지만 실제 데이터에선 오지 않기에 추가함

  const meetings =
    data?.pages.flatMap((page) =>
      page.data.map((fav: FavoriteWithMeeting) => ({
        ...fav.meeting,
        isFavorited: true,
      })),
    ) ?? [];

  return {
    meetings,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
