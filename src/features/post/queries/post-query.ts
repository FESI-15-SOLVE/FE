import { queryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { PostList, PostWithComments } from '@/api/data-contracts';
import { fetchPosts, fetchHotPosts, fetchPostDetail } from '../api/fetch-posts';
import { PostSortBy } from '../schema/post-search-params';

export interface PostListFilters {
  page: number;
  keyword: string;
  sortBy: PostSortBy;
}

type PostQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<PostList>;

type PostDetailQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<PostWithComments>;

export const postQueries = {
  all: () => ['posts'] as const,

  listKeys: () => [...postQueries.all(), 'list'] as const,
  listKey: (filters: PostListFilters) =>
    [...postQueries.listKeys(), filters] as const,

  hotKey: () => [...postQueries.all(), 'hot'] as const,
  detailKey: (id: number) =>
    [...postQueries.all(), 'detail', String(id)] as const,

  hotQuery: (customQueryFn?: PostQueryFn) =>
    queryOptions({
      queryKey: postQueries.hotKey(),
      queryFn: customQueryFn ?? (async () => fetchHotPosts()),
      staleTime: 0,
    }),

  listQuery: (filters: PostListFilters, customQueryFn?: PostQueryFn) =>
    queryOptions({
      queryKey: postQueries.listKey(filters),
      queryFn:
        customQueryFn ??
        (async () => {
          const limit = 10;
          const offset = (filters.page - 1) * limit;
          return fetchPosts({
            type: 'all',
            keyword: filters.keyword || undefined,
            sortBy: filters.sortBy,
            offset,
            limit,
          });
        }),
      staleTime: 0,
    }),

  detailQuery: (id: number, customQueryFn?: PostDetailQueryFn) =>
    queryOptions({
      queryKey: postQueries.detailKey(id),
      queryFn: customQueryFn ?? (async () => fetchPostDetail(id)),
      enabled: Boolean(id),
      staleTime: 10 * 1000,
    }),
};
