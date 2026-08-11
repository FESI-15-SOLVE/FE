'use client';

import React from 'react';
import Image from 'next/image';
import { PostWithComments } from '@/api/data-contracts';
import { useAuthStore } from '@/providers/auth-provider';
import { formatRelativeTime } from '@/lib/date';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { PostDetailMenu } from './post-detail-menu';
import { usePostLike } from '../../hooks/use-post-like';
import { MarkdownViewer } from '@/components/ui/markdown/markdown-viewer';
import img_profile_female1_sm from '@/assets/imgs/img_profile_female1_sm.svg?url';

interface PostDetailCardProps {
  post: PostWithComments;
}

export function PostDetailCard({ post }: PostDetailCardProps) {
  const user = useAuthStore((s) => s.user);
  const isAuthor = Boolean(
    user?.id && (post.authorId === user.id || post.author?.id === user.id),
  );

  const { toggleLike, isLoading: isLiking } = usePostLike(
    post.id,
    post.isLiked,
    post.likeCount,
  );

  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  const commentCount = post.comments?.length ?? post._count?.comments ?? 0;

  return (
    <div className="flex flex-col w-full bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-xs gap-6">
      {/* Header Row: Title, Author, Meatballs Menu */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 w-full">
        <div className="flex items-start justify-between gap-4 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-[-0.48px] flex-1">
            {post.title}
          </h1>

          {/* Author Menu */}
          {isAuthor && <PostDetailMenu postId={post.id} />}
        </div>

        {/* Author Meta Info */}
        <div className="flex items-center gap-3">
          <div className="relative size-6 shrink-0 rounded-full overflow-hidden bg-slate-100">
            <Image
              src={post.author?.image ?? img_profile_female1_sm}
              alt={post.author?.name ?? '작성자'}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="text-slate-700 font-semibold">
              {post.author?.name}
            </span>
            <span>•</span>
            <span>{dateStr}</span>
          </div>
        </div>
      </div>

      {/* Main Post Content */}
      <div className="flex flex-col gap-6 w-full py-2">
        <MarkdownViewer content={post.content} />

        {/* Post Main Image (if separated from content markdown) */}
        {post.image && !post.content.includes(post.image) && (
          <div className="relative w-auto max-w-full h-auto max-h-[500px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 my-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-auto h-auto max-h-[500px] max-w-full rounded-2xl object-contain"
            />
          </div>
        )}
      </div>

      {/* Footer Meta Row: Time, Like Button, Comment Count */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 w-full text-sm font-medium text-slate-500">
        <div className="flex items-center gap-4">
          <span>{formatRelativeTime(post.createdAt)}</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Like Button */}
          <button
            type="button"
            disabled={isLiking}
            onClick={() => toggleLike(post.isLiked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              post.isLiked
                ? 'bg-green-50 text-green-500 font-semibold'
                : 'hover:bg-slate-50 text-slate-500'
            }`}
          >
            <ThumbsUp
              className={`size-4.5 ${
                post.isLiked ? 'fill-green-500 text-green-500' : 'text-slate-500'
              }`}
            />
            <span>{post.likeCount}</span>
          </button>

          {/* Comment Count */}
          <div className="flex items-center gap-1.5 text-slate-500 px-2">
            <MessageSquare className="size-4.5" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
