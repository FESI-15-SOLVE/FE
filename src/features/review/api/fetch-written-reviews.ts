import { clientApi } from '@/lib/client-api';
import { UserReviewsResponse } from '@/api/data-contracts';

export async function fetchWrittenReviews(
  cursor?: string,
  size: number = 10,
): Promise<UserReviewsResponse> {
  const res = await clientApi.get<UserReviewsResponse>('/reviews/written', {
    params: { cursor, size },
  });
  return res.data;
}
