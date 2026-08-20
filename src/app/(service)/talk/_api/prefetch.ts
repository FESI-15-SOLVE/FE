import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { CACHE_TAGS } from '@/constants/cache-tags';
import {
  postQueries,
  PostListFilters,
} from '@/features/post/queries/post-query';

/** 이번주 HOT 게시물 서버 프리페치 */
export async function prefetchHotPosts(queryClient: QueryClient) {
  await queryClient.prefetchQuery(
    postQueries.hotQuery(async () => {
      const res = await ServerApi.posts.getPosts(
        {
          teamId: TEAM_ID,
          type: 'best',
          size: 4,
        },

        { next: { tags: [CACHE_TAGS.POSTS_HOT] }, secure: false },
      );
      return res.data;
    }),
  );
}

/** 달램토크 메인 게시글 목록 서버 프리페치 */
export async function prefetchTalkPosts(
  queryClient: QueryClient,
  filters: PostListFilters,
) {
  const limit = 10;
  const offset = (filters.page - 1) * limit;

  await queryClient.prefetchQuery(
    postQueries.listQuery(filters, async () => {
      const res = await ServerApi.posts.getPosts(
        {
          teamId: TEAM_ID,
          type: 'all',
          keyword: filters.keyword || undefined,
          sortBy: filters.sortBy,
          offset,
          limit,
        },

        { next: { tags: [CACHE_TAGS.POSTS_LIST] }, secure: false },
      );
      return res.data;
    }),
  );
}
