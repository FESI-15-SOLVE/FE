import {
  infiniteQueryOptions,
  queryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import {
  CategoryStatistics,
  PaginatedReview,
  ReviewStatistics,
  UserReviewsResponse,
} from '@/api/data-contracts';
import { fetchWrittenReviews } from '../api/fetch-written-reviews';
import { fetchAllReviews } from '../api/fetch-all-reviews';
import {
  fetchCategoryReviewStatistics,
  fetchReviewStatistics,
} from '../api/fetch-review-statistics';
import { ReviewFilters } from '../utils/review-filter-mapper';

type MyWrittenReviewQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<UserReviewsResponse>;

type PublicReviewsQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<PaginatedReview>;

export const reviewQueries = {
  /** 공통 루트 키 */
  all: () => ['reviews'] as const,

  /** 모든 리뷰 목록 키/쿼리 */
  publicListKeys: (filters: ReviewFilters) =>
    [...reviewQueries.all(), 'publicList', filters] as const,

  publicListQuery: (
    filters: ReviewFilters,
    customQueryFn?: PublicReviewsQueryFn,
  ) =>
    infiniteQueryOptions({
      queryKey: reviewQueries.publicListKeys(filters),
      queryFn:
        customQueryFn ??
        (async ({ pageParam }) =>
          fetchAllReviews(filters, pageParam ? String(pageParam) : undefined)),
      getNextPageParam: (lastPage: PaginatedReview) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),

  /** 전체 리뷰 통계 키/쿼리 */
  statisticsKeys: () =>
    [...reviewQueries.all(), 'statistics'] as const,

  statisticsQuery: (customQueryFn?: () => Promise<ReviewStatistics>) =>
    queryOptions({
      queryKey: reviewQueries.statisticsKeys(),
      queryFn: customQueryFn ?? (() => fetchReviewStatistics()),
    }),

  /** 카테고리별 리뷰 통계 키/쿼리 */
  categoryStatisticsKeys: () =>
    [...reviewQueries.all(), 'categoryStatistics'] as const,

  categoryStatisticsQuery: (
    customQueryFn?: () => Promise<CategoryStatistics>,
  ) =>
    queryOptions({
      queryKey: reviewQueries.categoryStatisticsKeys(),
      queryFn: customQueryFn ?? (() => fetchCategoryReviewStatistics()),
    }),

  /** 내 리뷰 전용 루트 키 */
  myKeys: () => [...reviewQueries.all(), 'my'] as const,

  /** 내가 작성한 리뷰 목록 키/쿼리 */
  myWrittenListKeys: () => [...reviewQueries.myKeys(), 'written'] as const,

  myWrittenListQuery: (customQueryFn?: MyWrittenReviewQueryFn) =>
    infiniteQueryOptions({
      queryKey: reviewQueries.myWrittenListKeys(),
      queryFn:
        customQueryFn ??
        (async ({ pageParam }) =>
          fetchWrittenReviews(pageParam ? String(pageParam) : undefined)),
      getNextPageParam: (lastPage: UserReviewsResponse) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),
};
