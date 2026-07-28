import { useQuery } from '@tanstack/react-query';
import { favoriteQueries } from '../queries/favorite-query';
import { fetchFavoriteCount } from '../api/fetch-favorite-count';

export function useFavoriteCount(enabled: boolean = true) {
  return useQuery({
    queryKey: favoriteQueries.countKey(),
    queryFn: fetchFavoriteCount,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
