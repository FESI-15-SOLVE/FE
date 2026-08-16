'use client';

import { useQuery } from '@tanstack/react-query';
import { reviewQueries } from '../queries/review-query';

export interface DisplayStatistics {
  averageScore: number;
  totalReviews: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}

const DEFAULT_STATISTICS: DisplayStatistics = {
  averageScore: 0,
  totalReviews: 0,
  fiveStars: 0,
  fourStars: 0,
  threeStars: 0,
  twoStars: 0,
  oneStar: 0,
};

export function useReviewStatistics(activeCategory: string) {
  const isAll = !activeCategory || activeCategory === '전체';

  const overallQuery = useQuery({
    ...reviewQueries.statisticsQuery(),
    enabled: isAll,
  });

  const categoryQuery = useQuery({
    ...reviewQueries.categoryStatisticsQuery(),
    enabled: !isAll,
  });

  let statistics: DisplayStatistics = DEFAULT_STATISTICS;

  if (isAll && overallQuery.data) {
    statistics = {
      averageScore: overallQuery.data.averageScore ?? 0,
      totalReviews: overallQuery.data.totalReviews ?? 0,
      fiveStars: overallQuery.data.fiveStars ?? 0,
      fourStars: overallQuery.data.fourStars ?? 0,
      threeStars: overallQuery.data.threeStars ?? 0,
      twoStars: overallQuery.data.twoStars ?? 0,
      oneStar: overallQuery.data.oneStar ?? 0,
    };
  } else if (!isAll && categoryQuery.data) {
    const categoryItem = categoryQuery.data.find(
      (item) => item.type === activeCategory,
    );
    if (categoryItem) {
      statistics = {
        averageScore: categoryItem.averageScore ?? 0,
        totalReviews: categoryItem.totalReviews ?? 0,
        fiveStars: categoryItem.fiveStars ?? 0,
        fourStars: categoryItem.fourStars ?? 0,
        threeStars: categoryItem.threeStars ?? 0,
        twoStars: categoryItem.twoStars ?? 0,
        oneStar: categoryItem.oneStar ?? 0,
      };
    }
  }

  return {
    statistics,
    isLoading: isAll ? overallQuery.isLoading : categoryQuery.isLoading,
  };
}
