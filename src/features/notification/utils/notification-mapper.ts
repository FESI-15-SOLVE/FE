import { Notification } from '@/api/data-contracts';
import { ROUTES } from '@/constants/routes';
import { formatDistanceToNowStrict, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface FormattedNotification {
  id: number;
  type: Notification['type'];
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  targetHref: string;
  image?: string | null;
}

export function formatNotification(notif: Notification): FormattedNotification {
  let title = '알림';
  let targetHref: string = ROUTES.HOME;

  switch (notif.type) {
    case 'MEETING_CONFIRMED':
      title = '모임 개설 확정';
      targetHref = notif.data?.meetingId
        ? ROUTES.MEETINGS.DETAIL(notif.data.meetingId)
        : ROUTES.MEETINGS.LIST;
      break;
    case 'MEETING_CANCELED':
      title = '모임 취소';
      targetHref = notif.data?.meetingId
        ? ROUTES.MEETINGS.DETAIL(notif.data.meetingId)
        : ROUTES.MEETINGS.LIST;
      break;
    case 'MEETING_DELETED':
      title = '모임 삭제';
      targetHref = ROUTES.MEETINGS.LIST;
      break;
    case 'COMMENT':
      title = '새로운 댓글';
      targetHref = notif.data?.postId
        ? ROUTES.TALK.DETAIL(notif.data.postId)
        : ROUTES.TALK.LIST;
      break;
  }

  const parsedDate = notif.createdAt ? new Date(notif.createdAt) : null;
  const timeAgo =
    parsedDate && isValid(parsedDate)
      ? formatDistanceToNowStrict(parsedDate, {
          addSuffix: true,
          locale: ko,
        })
      : '';

  return {
    id: notif.id,
    type: notif.type,
    title,
    message: notif.message,
    timeAgo,
    isRead: notif.isRead,
    targetHref,
    image: notif.data?.image,
  };
}
