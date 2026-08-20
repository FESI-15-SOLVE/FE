/**
 * Next.js fetch 캐시 태그 상수
 *
 * Server Action에서 revalidateTag(CACHE_TAGS.xxx)를 호출하면
 * 동일 태그가 붙은 모든 fetch 캐시(SSR prefetch + Route Handler)가 한 번에 무효화된다.
 */
export const CACHE_TAGS = {
  /** 게시글 목록 (일반 목록, 검색, 정렬) */
  POSTS_LIST: 'posts-list',
  /** HOT 베스트 게시글 목록 */
  POSTS_HOT: 'posts-hot',
  /** 게시글 상세 (태그에 id 포함: `post-detail-{id}`) */
  postDetail: (postId: number) => `post-detail-${postId}`,
} as const;
