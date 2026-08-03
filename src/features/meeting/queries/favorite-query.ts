import { infiniteQueryOptions } from '@tanstack/react-query';
import { GetFavoritesParams, FavoriteList } from '@/api/data-contracts';
import { ServerApi } from '@/api/server-api';

export const favoriteQueries = {
  all: ['favorites'] as const,
  countKey: () => [...favoriteQueries.all, 'count'] as const,
  listKeys: () => [...favoriteQueries.all, 'list'] as const,
  listKey: (filters: Partial<GetFavoritesParams>) =>
    [...favoriteQueries.listKeys(), filters] as const,

  listQuery: (
    teamId: string,
    filters: Partial<GetFavoritesParams>,
    queryFn?: () => Promise<FavoriteList>,
  ) =>
    infiniteQueryOptions<FavoriteList>({
      queryKey: favoriteQueries.listKey(filters),
      queryFn: async ({ pageParam }) => {
        if (queryFn) return queryFn();
        const res = await ServerApi.favorites.getFavorites({
          teamId,
          ...filters,
          cursor: pageParam ? String(pageParam) : undefined,
        });
        return res.data;
      },
      getNextPageParam: (lastPage: FavoriteList) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),
};
