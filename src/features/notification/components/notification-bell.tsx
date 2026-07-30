'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import { cn } from '@/lib/utils';
import IconBell from '@/assets/icons/bell.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NotificationList } from './notification-list';

interface NotificationBellProps {
  hasUnread?: boolean;
}

export function NotificationBell({ hasUnread = true }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  // 종 모양 아이콘 트리거 버튼
  const TriggerButton = (
    <div
      className={cn(
        'relative flex items-center justify-center p-1 text-slate-600 hover:text-neutral-900',
      )}
    >
      <IconBell className="size-5 sm:size-6" />
      {hasUnread && (
        <span className="absolute right-1 top-1 flex size-1.5 rounded-full bg-green-500" />
      )}
    </div>
  );

  const Header = (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
      <span className="text-[16px] font-semibold text-gray-900 tracking-[-0.32px]">
        알림 내역
      </span>
      <button
        className="text-[12px] font-semibold text-[#bbb] hover:text-gray-500 transition-colors"
        onClick={() => {
          /* 모두 읽기 로직 */
        }}
      >
        모두 읽기
      </button>
    </div>
  );

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>{TriggerButton}</PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-78.5 p-0 rounded-3xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] border-none overflow-hidden"
        >
          <div className="flex flex-col bg-white max-h-203">
            {Header}
            <div className="overflow-y-auto">
              <NotificationList />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>{TriggerButton}</SheetTrigger>
      <SheetContent
        showCloseButton={false}
        side="right"
        className="w-full sm:w-85 p-0 flex flex-col bg-white"
      >
        <SheetHeader className="p-0 text-left border-none">
          <SheetTitle className="sr-only">알림 내역</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {Header}
          <div className="flex-1 overflow-y-auto">
            <NotificationList />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
