'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import { AlertModal } from '@/components/ui/alert-modal';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ROUTES } from '@/constants/routes';
import { useDeletePost } from '../../hooks/use-delete-post';

interface PostDetailMenuProps {
  postId: number;
}

export function PostDetailMenu({ postId }: PostDetailMenuProps) {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deletePost } = useDeletePost(postId);

  const handleEditClick = () => {
    setIsPopoverOpen(false);
    router.push(ROUTES.TALK.EDIT(postId));
  };

  const handleDeleteClick = () => {
    setIsPopoverOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    deletePost();
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          aria-label="게시글 설정 메뉴"
          className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <MoreHorizontal className="size-6" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={6}
          className="w-28 bg-white border border-slate-100 rounded-2xl shadow-lg p-1 overflow-hidden"
        >
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full text-center px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer rounded-xl"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="w-full text-center px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer rounded-xl"
          >
            삭제하기
          </button>
        </PopoverContent>
      </Popover>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="게시글 삭제"
        description="정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
