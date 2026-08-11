import React from 'react';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';
import { postSearchParamsCache } from '@/features/post/schema/post-search-params';
import { prefetchHotPosts, prefetchTalkPosts } from './_api/prefetch';

import { TalkHeader } from '@/features/post/components/talk-list/talk-header';
import { HotPostsSection } from '@/features/post/components/talk-list/hot-posts-section';
import { TalkFilterSection } from '@/features/post/components/talk-list/talk-filter-section';
import { TalkPostList } from '@/features/post/components/talk-list/talk-post-list';
import { CreatePostFloatingButton } from '@/features/post/components/talk-list/create-post-floating-button';

interface TalkPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function TalkPage({ searchParams }: TalkPageProps) {
  const filters = postSearchParamsCache.parse(await searchParams);
  const queryClient = new QueryClient();

  // HOT 게시물 & 메인 게시글 목록 동시 서버 프리페치
  await Promise.all([
    prefetchHotPosts(queryClient),
    prefetchTalkPosts(queryClient, filters),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col w-full mx-auto gap-8 py-8 px-4 sm:px-6">
          {/* 1. Header Section */}
          <TalkHeader />

          {/* 2. Hot Posts Carousel / Grid */}
          <HotPostsSection />

          {/* 3. Search & Sort Filter */}
          <TalkFilterSection />

          {/* 4. Main Posts List & Pagination */}
          <TalkPostList />
        </div>
      </HydrationBoundary>

      {/* 모바일 FAB — 게시물 등록하기 */}
      <CreatePostFloatingButton />
    </>
  );
}
