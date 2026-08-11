import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export const SORT_BY_OPTIONS = [
  'createdAt',
  'likeCount',
  'viewCount',
  'commentCount',
] as const;

export type PostSortBy = (typeof SORT_BY_OPTIONS)[number];

export const postSearchParams = {
  page: parseAsInteger.withDefault(1),
  keyword: parseAsString.withDefault(''),
  sortBy: parseAsStringEnum<PostSortBy>([...SORT_BY_OPTIONS]).withDefault('createdAt'),
};

export const postSearchParamsCache = createSearchParamsCache(postSearchParams);
