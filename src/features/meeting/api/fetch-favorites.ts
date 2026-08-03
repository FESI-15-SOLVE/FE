import { clientApi } from '@/lib/client-api';
import { FavoriteList, GetFavoritesParams } from '@/api/data-contracts';

export async function fetchFavorites(
  params: Partial<GetFavoritesParams>,
  pageParam?: string,
): Promise<FavoriteList> {
  const res = await clientApi.get<FavoriteList>('/favorites', {
    params: {
      ...params,
      cursor: pageParam,
    },
  });
  return res.data;
}
