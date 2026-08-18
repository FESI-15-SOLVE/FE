import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { reviewQueries } from '@/features/review/queries/review-query';
import { ReviewSearchParams } from '@/features/review/schema/review-search-params';
import { mapReviewFiltersToQueryParams } from '@/features/review/utils/review-filter-mapper';

/** 공개 리뷰 목록 서버 프리페치 */
export async function prefetchPublicReviews(
  queryClient: QueryClient,
  filters: ReviewSearchParams,
) {
  const queryParams = mapReviewFiltersToQueryParams(filters);

  await queryClient.prefetchInfiniteQuery(
    reviewQueries.publicListQuery(filters, async () => {
      const res = await ServerApi.reviews.getReviews({
        teamId: TEAM_ID,
        ...queryParams,
      });
      return res.data;
    }),
  );
}

/** 선택된 카테고리에 맞는 리뷰 통계 서버 프리페치 */
export async function prefetchActiveReviewStatistics(
  queryClient: QueryClient,
  filters: ReviewSearchParams,
) {
  const isAllCategory = !filters.type || filters.type === '전체';

  if (isAllCategory) {
    await queryClient.prefetchQuery(
      reviewQueries.statisticsQuery(async () => {
        const res = await ServerApi.reviews.getReviewStatistics({
          teamId: TEAM_ID,
        });
        return res.data;
      }),
    );
  } else {
    await queryClient.prefetchQuery(
      reviewQueries.categoryStatisticsQuery(async () => {
        const res = await ServerApi.reviews.getCategoryReviewStatistics({
          teamId: TEAM_ID,
        });
        return res.data;
      }),
    );
  }
}
