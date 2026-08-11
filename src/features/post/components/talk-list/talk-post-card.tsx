'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { PostWithAuthor } from '@/api/data-contracts';
import { ROUTES } from '@/constants/routes';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '@/lib/date';
import { stripTiptapMarkdown } from '@/lib/tiptap-utils';
import img_profile_female1_sm from '@/assets/imgs/img_profile_female1_sm.svg?url';

/** 공통 메타 텍스트 클래스 */
const metaTextCls =
  'text-sm font-medium text-slate-500 leading-5 tracking-[-0.28px] whitespace-nowrap';

/** 아이콘 + 카운트 한 세트 */
function StatItem({ icon: Icon, count }: { icon: LucideIcon; count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <Icon className="size-[15px] text-slate-500 shrink-0" />
      <span className={metaTextCls}>{count}</span>
    </div>
  );
}

interface TalkPostCardProps {
  post: PostWithAuthor;
}

export function TalkPostCard({ post }: TalkPostCardProps) {
  const plainContent = stripTiptapMarkdown(post.content);
  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  /** 하단 메타 (프로필 + 작성자/날짜 | 시간·좋아요·댓글) — 두 레이아웃 공통 */
  const metaRow = (
    <div className="flex items-center w-full">
      {/* 좌: 프로필 + 작성자 + 날짜 */}
      <div className="flex flex-1 items-center gap-2 min-w-0">
        <div className="relative size-6 shrink-0">
          <Image
            src={post.author.image ?? img_profile_female1_sm}
            alt={post.author.name}
            fill
            sizes="24px"
            className="object-contain rounded-full"
          />
        </div>
        <span className={metaTextCls}>{post.author.name}</span>
        <span className={metaTextCls}>{dateStr}</span>
      </div>

      {/* 우: 상대시간 · 좋아요 · 댓글 */}
      <div className="flex items-center gap-3 shrink-0">
        <span className={metaTextCls}>{formatRelativeTime(post.createdAt)}</span>
        <StatItem icon={ThumbsUp} count={post.likeCount} />
        <StatItem icon={MessageSquare} count={post._count?.comments ?? 0} />
      </div>
    </div>
  );

  return (
    <Link
      href={ROUTES.TALK.DETAIL(post.id)}
      className="group w-full border-b border-slate-200 last:border-b-0"
    >
      {/* ── 모바일 레이아웃 (< md) : 세로형 ── */}
      <div className="flex flex-col gap-3 py-5 md:hidden">
        {/* 제목 */}
        <p className="text-base font-bold text-slate-700 leading-6 tracking-[-0.32px] line-clamp-1 group-hover:text-green-500 transition-colors">
          {post.title}
        </p>

        {/* 이미지 — 피그마 모바일: 144px 높이, rounded-2xl */}
        {post.image && (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* 본문 미리보기 */}
        <p className="text-sm font-normal text-slate-700 leading-[22px] tracking-[-0.28px] line-clamp-2">
          {plainContent}
        </p>

        {/* 메타 */}
        {metaRow}
      </div>

      {/* ── 데스크탑 레이아웃 (≥ md) : 가로형 ── */}
      <div className="hidden md:flex items-center gap-8 w-full">
        {/* 썸네일 — 피그마: 200×200/rounded-3xl */}
        {post.image && (
          <div className="relative size-[200px] rounded-3xl overflow-hidden shrink-0 bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="200px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col justify-between h-full min-w-0 py-4">
          <div className="flex flex-col gap-2 pb-8 pr-40">
            <p className="text-xl font-bold text-slate-700 leading-[30px] tracking-[-0.4px] line-clamp-1 group-hover:text-green-500 transition-colors">
              {post.title}
            </p>
            <p className="text-[18px] font-normal text-slate-700 leading-7 tracking-[-0.36px] line-clamp-2">
              {plainContent}
            </p>
          </div>
          {metaRow}
        </div>
      </div>
    </Link>
  );
}
