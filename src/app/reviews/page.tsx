import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { reviewSearchParamsCache } from '@/features/review/schema/review-search-params';
import { AllReviewsContainer } from '@/features/review/components/all-reviews/all-reviews-container';
import {
  prefetchPublicReviews,
  prefetchActiveReviewStatistics,
} from './_api/prefetch';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReviewsPage({ searchParams }: PageProps) {
  const filters = reviewSearchParamsCache.parse(await searchParams);
  const queryClient = new QueryClient();

  // 리뷰 목록과 선택된 통계 프리패칭을 병렬로 동시 수행 (Promise.all)
  await Promise.all([
    prefetchPublicReviews(queryClient, filters),
    prefetchActiveReviewStatistics(queryClient, filters),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllReviewsContainer />
    </HydrationBoundary>
  );
}
