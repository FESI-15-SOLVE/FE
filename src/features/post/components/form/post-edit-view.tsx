'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { postQueries } from '@/features/post/queries/post-query';
import { PostForm } from './post-form';

interface PostEditViewProps {
  postId: number;
}

export function PostEditView({ postId }: PostEditViewProps) {
  const { data, isLoading } = useQuery(postQueries.detailQuery(postId));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] w-full">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return <PostForm mode="edit" postId={postId} initialData={data} />;
}
