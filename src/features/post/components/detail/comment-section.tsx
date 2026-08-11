'use client';

import React from 'react';
import { Comment } from '@/api/data-contracts';
import { CommentInputForm } from './comment-input-form';
import { CommentList } from './comment-list';

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  return (
    <div className="flex flex-col gap-6 w-full pt-4">
      {/* Header: 댓글 개수 */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-[-0.4px]">
          댓글
        </h3>
        <span className="text-lg sm:text-xl font-bold text-green-500">
          {comments.length}
        </span>
      </div>

      {/* 댓글 작성 폼 */}
      <CommentInputForm postId={postId} />

      {/* 댓글 목록 */}
      <CommentList postId={postId} comments={comments} />
    </div>
  );
}
