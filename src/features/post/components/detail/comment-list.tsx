'use client';

import React from 'react';
import { Comment } from '@/api/data-contracts';
import { CommentItem } from './comment-item';

interface CommentListProps {
  postId: number;
  comments: Comment[];
}

export function CommentList({ postId, comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-2 text-center text-slate-400 w-full">
        <span className="text-2xl">💬</span>
        <p className="text-sm">첫 번째 댓글을 작성해 보세요!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full divide-y divide-slate-100">
      {comments.map((comment) => (
        <CommentItem key={comment.id} postId={postId} comment={comment} />
      ))}
    </div>
  );
}
