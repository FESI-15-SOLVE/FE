import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';
import { SortOrder, SORT_ORDER_VALUES } from '@/features/meeting/schema/meeting-query-schema';
import { REVIEW_SORT_BY_VALUES, ReviewSortBy } from './review-query-schema';

export const reviewSearchParams = {
  type: parseAsString.withDefault(''),
  region: parseAsString.withDefault(''),
  date: parseAsString.withDefault(''),
  sortBy: parseAsStringEnum<ReviewSortBy>([...REVIEW_SORT_BY_VALUES]),
  sortOrder: parseAsStringEnum<SortOrder>([...SORT_ORDER_VALUES]),
};

export const reviewSearchParamsCache =
  createSearchParamsCache(reviewSearchParams);
