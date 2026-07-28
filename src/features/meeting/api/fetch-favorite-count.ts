import { clientApi } from '@/lib/client-api';
import { FavoriteCount } from '@/api/data-contracts';

export async function fetchFavoriteCount(): Promise<FavoriteCount> {
  const res = await clientApi.get<FavoriteCount>('/favorites/count');
  return res.data;
}
