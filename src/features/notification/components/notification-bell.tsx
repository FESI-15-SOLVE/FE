'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MEDIA_QUERIES } from '@/constants/breakpoint';
import { useMediaQuery } from '@/hooks/ui/use-media-query';
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
import { notificationQueries } from '../queries/notification-query';
import { useMarkAllNotificationsAsReadMutation } from '../hooks/use-notification-mutations';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.sm);
  const isInitialRef = useRef(true);
  const prevCountRef = useRef<number | undefined>(undefined);
  const queryClient = useQueryClient();

  const { data: unreadData } = useQuery(notificationQueries.unreadCountQuery());
  const markAllAsReadMutation = useMarkAllNotificationsAsReadMutation();

  const unreadCount = unreadData?.count ?? 0;
  const hasUnread = unreadCount > 0;

  // 2대 프로덕션 가드: 첫 로드 오탐 완벽 방지 (unreadData 원본 객체 참조) 및 드롭다운 열림 상태별 분기
  useEffect(() => {
    // 1. 아직 API 데이터가 로드되기 전(undefined)이면 비교 대상이 아니므로 중단 (0 폴백 오탐 방지)
    if (unreadData === undefined) return;

    // 2. 앱 첫 로드 시 오탐 방지 가드
    if (isInitialRef.current || prevCountRef.current === undefined) {
      isInitialRef.current = false;
      prevCountRef.current = unreadData.count;
      return;
    }

    // 3. 실질적인 새 알림 수신 감지 (newCount > prevCount)
    if (unreadData.count > prevCountRef.current) {
      if (!isOpen) {
        queryClient.resetQueries({ queryKey: notificationQueries.listKeys() });
      } else {
        queryClient.invalidateQueries({ queryKey: notificationQueries.listKeys() });
      }
    }

    prevCountRef.current = unreadData.count;
  }, [unreadData, isOpen, queryClient]);

  // 종 모양 아이콘 트리거 버튼
  const TriggerButton = (
    <div
      className={cn(
        'relative flex items-center justify-center p-1 text-slate-600 hover:text-neutral-900 cursor-pointer',
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
        type="button"
        disabled={markAllAsReadMutation.isPending}
        className="text-[12px] font-semibold text-[#bbb] hover:text-gray-500 transition-colors cursor-pointer disabled:opacity-50"
        onClick={() => {
          if (hasUnread && !markAllAsReadMutation.isPending) {
            markAllAsReadMutation.mutate();
          }
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
          <div className="flex flex-col bg-white max-h-[min(75vh,520px)]">
            {Header}
            <div className="flex-1 overflow-y-auto">
              <NotificationList isOpen={isOpen} />
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
        className="w-full sm:w-85 p-0 flex flex-col bg-white h-full"
      >
        <SheetHeader className="p-0 text-left border-none">
          <SheetTitle className="sr-only">알림 내역</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full min-h-0">
          {Header}
          <div className="flex-1 overflow-y-auto">
            <NotificationList isOpen={isOpen} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
