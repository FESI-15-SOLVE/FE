import { infiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { UserReviewsResponse } from '@/api/data-contracts';
import { fetchWrittenReviews } from '../api/fetch-written-reviews';

type MyWrittenReviewQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<UserReviewsResponse>;

export const reviewQueries = {
  /** 공통 루트 키: 향후 전체 리뷰 페이지(모든 사용자 리뷰, PaginatedReview) 쿼리에 사용 예정 */
  all: () => ['reviews'] as const,

  /** 내 리뷰 전용 루트 키 */
  myKeys: () => [...reviewQueries.all(), 'my'] as const,

  /** 내가 작성한 리뷰 목록 키/쿼리 (UserReviewsResponse 기반) */
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
