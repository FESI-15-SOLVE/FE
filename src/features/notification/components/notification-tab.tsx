'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Notification } from '@/api/data-contracts';
import { formatNotification } from '../utils/notification-mapper';
import { useMarkNotificationAsReadMutation } from '../hooks/use-notification-mutations';

interface NotificationTabProps {
  data: Notification;
  className?: string;
}

export function NotificationTab({ data, className }: NotificationTabProps) {
  const router = useRouter();
  const markAsReadMutation = useMarkNotificationAsReadMutation();
  const formatted = formatNotification(data);

  const handleClick = () => {
    if (!formatted.isRead) {
      markAsReadMutation.mutate(formatted.id);
    }
    if (formatted.targetHref) {
      router.push(formatted.targetHref);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        'flex gap-4 p-4 items-start w-full transition-colors cursor-pointer hover:bg-slate-50',
        formatted.isRead ? 'bg-white' : 'bg-[#f6f7f9]',
        className,
      )}
    >
      {/* 아이콘 또는 이미지 영역 */}
      {formatted.type === 'COMMENT' ? (
        <div className="shrink-0 size-6 mt-1 overflow-hidden rounded-full bg-slate-200">
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
              {formatted.title}
            </p>
            {!formatted.isRead && (
              <div className="size-1 rounded-full bg-green-500 ml-1" />
            )}
          </div>
          <span className="text-[12px] text-[#bbb] leading-none">
            {formatted.timeAgo}
          </span>
        </div>
        <div className="text-[14px] text-[#737373] tracking-[-0.28px] leading-5 wrap-break-word">
          {formatted.message}
        </div>
      </div>
    </div>
  );
}
