'use client';

import { cn } from '@/lib/utils';

import { NotificationTab, NotificationItem } from './notification-tab';
const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'MEETING_CONFIRM',
    title: '모임 확정',
    timeAgo: '1분 전',
    message: "‘힐링 오피스 스트레칭' 모임 개설이 확정되었어요!",
    isRead: false,
  },
  {
    id: '2',
    type: 'MEETING_CANCEL',
    title: '모임 취소',
    timeAgo: '2시간 전',
    message: "‘힐링 오피스 스트레칭' 모임이 취소되었어요.",
    isRead: false,
  },
  {
    id: '3',
    type: 'NEW_COMMENT',
    title: '새로운 댓글',
    timeAgo: '4일 전',
    message: '클라이밍 어때요? – 딸기님의 댓글 재밌어요~',

    isRead: true,
  },
  {
    id: '4',
    type: 'MEETING_UPDATE',
    title: '모임 내용 변경',
    timeAgo: '5일 전',
    message: "‘카페 투어 멤버 모집' 모임 내용이 변경되었어요",
    isRead: true,
  },
];

interface NotificationListProps {
  className?: string;
  isEmpty?: boolean;
}

export function NotificationList({
  className,
  isEmpty = false,
}: NotificationListProps) {
  if (isEmpty || MOCK_NOTIFICATIONS.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-14',
          className,
        )}
      >
        <p className="text-[14px] font-medium text-[#a4a4a4] tracking-[-0.28px]">
          아직 알림이 없어요
        </p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {MOCK_NOTIFICATIONS.map((notif) => (
        <NotificationTab key={notif.id} data={notif} />
      ))}
    </div>
  );
}
