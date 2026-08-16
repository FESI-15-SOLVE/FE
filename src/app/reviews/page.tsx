import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { reviewSearchParamsCache } from '@/features/review/schema/review-search-params';
import { reviewQueries } from '@/features/review/queries/review-query';
import { AllReviewsContainer } from '@/features/review/components/all-reviews/all-reviews-container';
import { mapReviewFiltersToQueryParams } from '@/features/review/utils/review-filter-mapper';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReviewsPage({ searchParams }: PageProps) {
  const filters = reviewSearchParamsCache.parse(await searchParams);
  const queryClient = new QueryClient();

  const queryParams = mapReviewFiltersToQueryParams(filters);

  // 리뷰 목록 SSR 프리패칭 (ServerApi direct with TEAM_ID)
  await queryClient.prefetchInfiniteQuery(
    reviewQueries.publicListQuery(filters, async () => {
      const res = await ServerApi.reviews.getReviews({
        teamId: TEAM_ID,
        ...queryParams,
      });
      return res.data;
    }),
  );

  // 통계 데이터 조건부 SSR 프리패칭 (전체 vs 특정 카테고리)
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllReviewsContainer />
    </HydrationBoundary>
  );
}
