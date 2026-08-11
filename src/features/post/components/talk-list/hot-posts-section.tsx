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
    <div className="flex flex-col gap-4 w-full">
      {/* 섹션 타이틀 — 피그마: 24px/SemiBold/leading-32/tracking-[-0.48px] */}
      <h2 className="text-2xl font-semibold text-slate-900 leading-8 tracking-[-0.48px]">
        이번주 HOT 게시물!
      </h2>

      {/* 카드 그리드 — 피그마: 4열 가로 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {posts.map((post: PostWithAuthor) => (
          <Link
            key={post.id}
            href={ROUTES.TALK.DETAIL(post.id)}
            className="flex flex-col gap-3.5 group"
          >
            {/* 썸네일 이미지 — 피그마: h-180/rounded-3xl */}
            <div className="relative h-45 rounded-3xl overflow-hidden shrink-0 w-full bg-slate-100">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-4xl">💬</span>
                </div>
              )}
            </div>

            {/* 카드 하단: 제목 + 메타 */}
            <div className="flex flex-col gap-4 px-1 w-full">
              <div className="flex flex-col gap-0.5 w-full">
                {/* 카드 제목 — 피그마: 20px/SemiBold/black/leading-30/tracking-[-0.4px] */}
                <p className="text-xl font-semibold text-slate-900 leading-7.5 tracking-[-0.4px] line-clamp-2 group-hover:text-green-500 transition-colors">
                  {post.title}
                </p>

                {/* 메타 정보: 시간 · 좋아요 · 댓글 — 피그마: 14px/Medium */}
                <div className="flex items-center gap-3 pb-1.5">
                  {/* 작성 시간 */}
                  <span className="text-sm font-medium text-slate-500 leading-5 tracking-[-0.28px] whitespace-nowrap">
                    {formatRelativeTime(post.createdAt)}
                  </span>

                  {/* 좋아요 */}
                  <div className="flex items-center gap-0.5">
                    <ThumbsUp className="size-4.5 text-slate-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-500 leading-5 tracking-[-0.28px]">
                      {post.likeCount}
                    </span>
                  </div>

                  {/* 댓글 */}
                  <div className="flex items-center gap-0.5">
                    <MessageSquare className="size-4.5 text-slate-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-600 leading-5 tracking-[-0.28px]">
                      {post._count.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
