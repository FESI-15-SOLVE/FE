'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { postQueries } from '../../queries/post-query';
import { PostDetailCard } from './post-detail-card';
import { CommentSection } from './comment-section';

interface PostDetailViewProps {
  postId: number;
}

export function PostDetailView({ postId }: PostDetailViewProps) {
  const { data: post, isLoading } = useQuery(postQueries.detailQuery(postId));

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-[860px] mx-auto gap-8 py-8 px-4 sm:px-0">
        <div className="w-full h-96 rounded-3xl bg-slate-100 animate-pulse" />
        <div className="w-full h-48 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 w-full">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[860px] mx-auto gap-8 py-8 px-4 sm:px-0">
      {/* 1. 게시글 상세 본문 카드 */}
      <PostDetailCard post={post} />

      {/* 2. 댓글 섹션 (댓글 작성 + 댓글 목록) */}
      <CommentSection postId={postId} comments={post.comments ?? []} />
    </div>
  );
}
