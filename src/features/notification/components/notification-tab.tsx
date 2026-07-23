'use client';

import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  type: 'MEETING_CONFIRM' | 'MEETING_CANCEL' | 'NEW_COMMENT' | 'MEETING_UPDATE';
  title: string;
  timeAgo: string;
  message: string;
  isRead: boolean;
  image?: string;
}

interface NotificationTabProps {
  data: NotificationItem;
  className?: string;
}

export function NotificationTab({ data, className }: NotificationTabProps) {
  return (
    <div
      className={cn(
        'flex gap-4 p-4 items-start w-full transition-colors',
        data.isRead ? 'bg-white' : 'bg-[#f6f7f9]',
        className,
      )}
    >
      {/* 아이콘 또는 이미지 영역 */}
      {data.type === 'NEW_COMMENT' ? (
        <div className="shrink-0 size-6 mt-1 overflow-hidden rounded-full bg-slate-200">
          {/* 이미지가 없을 경우를 대비한 플레이스홀더 원형 */}
          <div className="size-full bg-slate-300" />
        </div>
      ) : (
        <div className="shrink-0 size-10 rounded-lg overflow-hidden bg-slate-200">
          <div className="size-full bg-slate-300" />
        </div>
      )}

      {/* 본문 영역 */}
      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <div className="flex items-center justify-between h-4.5">
          <div className="flex items-center gap-1">
            <p className="text-[12px] font-semibold text-[#333] leading-none">
              {data.title}
            </p>
            {!data.isRead && (
              <div className="size-1 rounded-full bg-green-500 ml-1" />
            )}
          </div>
          <span className="text-[12px] text-[#bbb] leading-none">
            {data.timeAgo}
          </span>
        </div>
        <div className="text-[14px] text-[#737373] tracking-[-0.28px] leading-5 wrap-break-word">
          {data.message}
        </div>
      </div>
    </div>
  );
}
