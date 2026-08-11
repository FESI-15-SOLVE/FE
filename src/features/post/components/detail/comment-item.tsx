'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Comment } from '@/api/data-contracts';
import { useAuthStore } from '@/providers/auth-provider';
import { formatRelativeTime } from '@/lib/date';
import { MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { AlertModal } from '@/components/ui/alert-modal';
import { Button } from '@/components/ui/button';
import img_profile_female1_sm from '@/assets/imgs/img_profile_female1_sm.svg?url';
import { useUpdateComment } from '../../hooks/use-update-comment';
import { useDeleteComment } from '../../hooks/use-delete-comment';
import { useToggleCommentLike } from '../../hooks/use-toggle-comment-like';

interface CommentItemProps {
  postId: number;
  comment: Comment;
}

export function CommentItem({ postId, comment }: CommentItemProps) {
  const user = useAuthStore((s) => s.user);

  const isAuthor = Boolean(
    user?.id && (comment.authorId === user.id || comment.author?.id === user.id),
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { updateComment, isUpdating } = useUpdateComment(
    postId,
    comment.id,
    () => setIsEditing(false),
  );

  const { deleteComment } = useDeleteComment(postId, comment.id);
  const { toggleCommentLike, isLiking } = useToggleCommentLike(postId, comment.id);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateComment(editContent);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    deleteComment();
  };

  const dateStr = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-slate-100 last:border-b-0 w-full">
      {/* Header: Author Profile + Name + Date + Popover Menu */}
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3">
          <div className="relative size-8 shrink-0 rounded-full overflow-hidden bg-slate-100">
            <Image
              src={comment.author?.image ?? img_profile_female1_sm}
              alt={comment.author?.name ?? '댓글 작성자'}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="text-slate-700 font-semibold">
              {comment.author?.name}
            </span>
            <span>•</span>
            <span className="text-slate-400">{dateStr}</span>
            <span>•</span>
            <span className="text-slate-400 text-xs">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* Popover Menu (Author Only) */}
        {isAuthor && !isEditing && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger
              aria-label="댓글 메뉴"
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="size-5" />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={4}
              className="w-24 bg-white border border-slate-100 rounded-xl shadow-md p-1 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsEditing(true);
                }}
                className="w-full text-center px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer rounded-lg"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPopoverOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="w-full text-center px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer rounded-lg"
              >
                삭제
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Content or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-2 w-full pt-1">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm font-normal text-slate-800 focus:outline-none focus:border-green-500"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
              className="h-8 px-3 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              취소
            </button>
            <Button
              type="submit"
              size="custom"
              disabled={isUpdating}
              className="h-8 px-3 text-xs rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium cursor-pointer"
            >
              {isUpdating ? '수정 중...' : '저장'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between gap-4 w-full">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal flex-1 whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Comment Like Button */}
          <button
            type="button"
            disabled={isLiking}
            onClick={() => toggleCommentLike(comment.isLiked)}
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors cursor-pointer shrink-0 ${
              comment.isLiked
                ? 'bg-green-50 text-green-500 font-semibold'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            <ThumbsUp
              className={`size-3.5 ${
                comment.isLiked ? 'fill-green-500 text-green-500' : 'text-slate-400'
              }`}
            />
            <span>{comment.likeCount}</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AlertModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="댓글 삭제"
        description="정말로 이 댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
