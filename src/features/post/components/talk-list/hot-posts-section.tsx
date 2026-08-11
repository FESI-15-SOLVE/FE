'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { PostWithAuthor } from '@/api/data-contracts';
import { postQueries } from '../../queries/post-query';
import { ROUTES } from '@/constants/routes';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '@/lib/date';

export function HotPostsSection() {
  const { data } = useQuery(postQueries.hotQuery());
  const posts = (data?.data ?? []) as PostWithAuthor[];

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full overflow-hidden">
      {/* 섹션 타이틀 */}
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-8 tracking-tight px-1 sm:px-0">
        이번주 HOT 게시물!
      </h2>

      {/* 카드 컨테이너: 모바일은 가로 스크롤(Horizontal Scroll 162px), 데스크톱은 그리드(Grid) */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {posts.map((post: PostWithAuthor) => (
          <Link
            key={post.id}
            href={ROUTES.TALK.DETAIL(post.id)}
            className="flex flex-col gap-2.5 sm:gap-3.5 group shrink-0 w-[162px] sm:w-full snap-start"
          >
            {/* 썸네일 이미지 (모바일: 162x162, 데스크톱: h-45) */}
            <div className="relative size-[162px] sm:size-auto sm:h-45 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 w-full bg-slate-100">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 162px, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl">💬</span>
                </div>
              )}
            </div>

            {/* 카드 하단: 제목 + 메타 */}
            <div className="flex flex-col gap-1 sm:gap-2 px-1 w-full">
              {/* 카드 제목 */}
              <p className="text-base sm:text-xl font-semibold text-slate-900 leading-snug sm:leading-7.5 tracking-tight line-clamp-1 sm:line-clamp-2 group-hover:text-green-500 transition-colors">
                {post.title}
              </p>

              {/* 메타 정보: 시간 · 좋아요 · 댓글 */}
              <div className="flex items-center gap-2 sm:gap-3 pb-1">
                {/* 작성 시간 */}
                <span className="text-xs sm:text-sm font-medium text-slate-400 sm:text-slate-500 tracking-tight whitespace-nowrap">
                  {formatRelativeTime(post.createdAt)}
                </span>

                {/* 좋아요 */}
                <div className="flex items-center gap-0.5">
                  <ThumbsUp className="size-3.5 sm:size-4.5 text-slate-400 sm:text-slate-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-400 sm:text-slate-500 tracking-tight">
                    {post.likeCount}
                  </span>
                </div>

                {/* 댓글 */}
                <div className="flex items-center gap-0.5">
                  <MessageSquare className="size-3.5 sm:size-4.5 text-slate-400 sm:text-slate-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-tight">
                    {post._count.comments}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
