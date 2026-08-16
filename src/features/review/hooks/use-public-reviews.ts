'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { reviewSearchParams } from '../schema/review-search-params';
import { reviewQueries } from '../queries/review-query';

export function usePublicReviews() {
  const [filters, setFilters] = useQueryStates(reviewSearchParams);

  const query = useSuspenseInfiniteQuery(
    reviewQueries.publicListQuery(filters),
  );

  const reviews = query.data.pages.flatMap((page) => page.data ?? []);

  return {
    reviews,
    filters,
    setFilters,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
}
