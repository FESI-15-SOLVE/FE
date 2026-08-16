import { clientApi } from '@/lib/client-api';
import { PaginatedReview } from '@/api/data-contracts';
import { ReviewFilters, mapReviewFiltersToQueryParams } from '../utils/review-filter-mapper';

export async function fetchAllReviews(
  filters: ReviewFilters,
  cursor?: string,
): Promise<PaginatedReview> {
  const queryParams = mapReviewFiltersToQueryParams(filters);

  const res = await clientApi.get<PaginatedReview>('/reviews', {
    params: {
      ...queryParams,
      cursor: cursor || undefined,
    },
  });

  return res.data;
}
