'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePublicReviews } from '../../hooks/use-public-reviews';
import { useReviewStatistics } from '../../hooks/use-review-statistics';
import { AllReviewsHeader } from './all-reviews-header';
import { AllReviewsFilterSection } from './all-reviews-filter-section';
import { ReviewStatisticsSection } from './review-statistics-section';
import { PublicReviewCard } from './public-review-card';
import { EmptyReviewState } from '../empty-review-state';
import { ReviewListSkeleton } from '../review-list-skeleton';

export function AllReviewsContainer() {
  const { reviews, filters, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePublicReviews();

  const { statistics } = useReviewStatistics(filters.type || '');

  const loadMoreRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage && !isFetchingNextPage,
  });


  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* 페이지 타이틀 & 헤더 */}
        <AllReviewsHeader />

        {/* 필터 섹션 (카테고리 탭 + 날짜/지역/정렬) */}
        <AllReviewsFilterSection />

        {/* 통계 카드 배너 */}
        <ReviewStatisticsSection statistics={statistics} />

        {/* 리뷰 카드 목록 박스 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
          {reviews.length === 0 ? (
            <EmptyReviewState message="아직 작성된 리뷰가 없어요." />
          ) : (
            reviews.map((review) => (
              <PublicReviewCard key={review.id} review={review} />
            ))
          )}

          {/* 무한 스크롤 감지 영역 & 스켈레톤 */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="py-4">
              {isFetchingNextPage && <ReviewListSkeleton />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
