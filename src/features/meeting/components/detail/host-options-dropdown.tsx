'use client';

import { useState } from 'react';
import IconMeatballs from '@/assets/icons/meetballs.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface HostOptionsDropdownProps {
  onEditClick: () => void;
  onCancelClick: () => void;
}

export function HostOptionsDropdown({
  onEditClick,
  onCancelClick,
}: HostOptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="absolute top-5 right-6 sm:top-8.5 sm:right-10 size-6 sm:size-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="주최자 옵션 더보기"
          >
            <IconMeatballs className="size-full" />
          </button>
        }
      />
      <PopoverContent
        align="end"
        className="w-28 p-1 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col gap-0.5"
      >
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onEditClick();
          }}
          className="w-full px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
        >
          모임 수정
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onCancelClick();
          }}
          className="w-full px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          모임 취소
        </button>
      </PopoverContent>
    </Popover>
  );
}
