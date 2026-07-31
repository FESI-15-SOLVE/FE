import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';
import {
  SORT_BY_VALUES,
  SORT_ORDER_VALUES,
  SortBy,
  SortOrder,
} from './meeting-query-schema';

/**
 * 서버 & 클라이언트 공용 nuqs SearchParams 파서 정의
 */
export const meetingSearchParams = {
  type: parseAsString.withDefault(''),
  region: parseAsString.withDefault(''),
  date: parseAsString.withDefault(''),
  sortBy: parseAsStringEnum<SortBy>([...SORT_BY_VALUES]),
  sortOrder: parseAsStringEnum<SortOrder>([...SORT_ORDER_VALUES]),
};

/**
 * 서버 컴포넌트(page.tsx) 및 Route Handler용 searchParamsCache
 */
export const meetingSearchParamsCache =
  createSearchParamsCache(meetingSearchParams);
