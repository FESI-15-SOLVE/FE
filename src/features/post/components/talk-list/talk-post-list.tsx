'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { postSearchParams } from '../../schema/post-search-params';
import { postQueries } from '../../queries/post-query';
import { TalkPostCard } from './talk-post-card';
import { TalkPagination } from './talk-pagination';
import { PostWithAuthor } from '@/api/data-contracts';

export function TalkPostList() {
  const [params] = useQueryStates(postSearchParams);
  const { data, isLoading } = useQuery(postQueries.listQuery(params));

  const allPosts = (data?.data ?? []) as PostWithAuthor[];
  const searchKeyword = params.keyword.trim().toLowerCase();

  // 검색어 입력 시 클라이언트 필터링 추가 지원
  const filteredPosts = searchKeyword
    ? allPosts.filter(
        (p: PostWithAuthor) =>
          p.title.toLowerCase().includes(searchKeyword) ||
          p.content.toLowerCase().includes(searchKeyword),
      )
    : allPosts;

  const totalCount = data?.totalCount ?? filteredPosts.length;

  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-8 w-full border-b border-slate-200 py-4"
          >
            <div className="size-[200px] rounded-3xl bg-slate-100 animate-pulse shrink-0" />
            <div className="flex flex-col gap-3 flex-1">
              <div className="h-6 rounded-lg bg-slate-100 animate-pulse w-2/3" />
              <div className="h-4 rounded-lg bg-slate-100 animate-pulse w-full" />
              <div className="h-4 rounded-lg bg-slate-100 animate-pulse w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center w-full bg-slate-50 rounded-3xl border border-slate-100">
        <span className="text-4xl">📭</span>
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-700">
            게시물이 없습니다
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            첫번째 이야기를 작성해 자유롭게 공유해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col w-full gap-6">
        {filteredPosts.map((post: PostWithAuthor) => (
          <TalkPostCard key={post.id} post={post} />
        ))}
      </div>

      <TalkPagination totalCount={totalCount} />
    </div>
  );
}
