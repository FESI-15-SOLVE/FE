import { clientApi } from '@/lib/client-api';
import { CategoryStatistics, ReviewStatistics } from '@/api/data-contracts';

export async function fetchReviewStatistics(): Promise<ReviewStatistics> {
  const res = await clientApi.get<ReviewStatistics>('/reviews/statistics');
  return res.data;
}

export async function fetchCategoryReviewStatistics(): Promise<CategoryStatistics> {
  const res = await clientApi.get<CategoryStatistics>('/reviews/categories/statistics');
  return res.data;
}
