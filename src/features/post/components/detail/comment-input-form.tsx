'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/providers/auth-provider';
import { Button } from '@/components/ui/button';
import img_profile_female1_sm from '@/assets/imgs/img_profile_female1_sm.svg?url';
import { useCreateComment } from '../../hooks/use-create-comment';

interface CommentInputFormProps {
  postId: number;
}

export function CommentInputForm({ postId }: CommentInputFormProps) {
  const user = useAuthStore((s) => s.user);
  const [content, setContent] = useState('');

  const { createComment, isCreating } = useCreateComment(postId, () => {
    setContent('');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createComment(content);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 sm:gap-4 w-full">
      {/* Current User Profile Image */}
      <div className="relative size-11 sm:size-[54px] shrink-0 rounded-full overflow-hidden bg-slate-100 border border-slate-200/60">
        <Image
          src={user?.image ?? img_profile_female1_sm}
          alt={user?.name ?? '사용자'}
          fill
          sizes="54px"
          className="object-cover"
        />
      </div>

      {/* Unified Grey Input Box */}
      <div className="flex-1 flex items-center bg-slate-100 rounded-2xl pl-4 sm:pl-5 pr-2 py-2 gap-3 min-w-0">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="여기에 댓글을 남겨보세요"
          className="flex-1 bg-transparent h-10 sm:h-12 text-base sm:text-lg font-normal text-slate-800 placeholder:text-slate-400 focus:outline-none tracking-tight min-w-0"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!content.trim() || isCreating}
          className="h-11 sm:h-12 w-16 sm:w-20 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm sm:text-base shrink-0 disabled:bg-slate-300 disabled:text-slate-400 cursor-pointer transition-colors px-0 flex items-center justify-center tracking-tight"
        >
          {isCreating ? '등록 중' : '등록'}
        </Button>
      </div>
    </form>
  );
}
