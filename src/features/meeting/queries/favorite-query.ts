import {
  infiniteQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { GetFavoritesParams, FavoriteList } from '@/api/data-contracts';
import { fetchFavorites } from '../api/fetch-favorites';

type FavoriteQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<FavoriteList>;

export const favoriteQueries = {
  all: ['favorites'] as const,
  countKey: () => [...favoriteQueries.all, 'count'] as const,
  listKeys: () => [...favoriteQueries.all, 'list'] as const,
  listKey: (filters: Partial<GetFavoritesParams>) =>
    [...favoriteQueries.listKeys(), filters] as const,

  listQuery: (
    teamId: string,
    filters: Partial<GetFavoritesParams>,
    customQueryFn?: FavoriteQueryFn,
  ) =>
    infiniteQueryOptions({
      queryKey: favoriteQueries.listKey(filters),
      queryFn:
        customQueryFn ??
        (async ({ pageParam }) =>
          fetchFavorites(filters, pageParam ? String(pageParam) : undefined)),
      getNextPageParam: (lastPage: FavoriteList) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),
};
