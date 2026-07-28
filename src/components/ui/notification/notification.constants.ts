import type { NotificationType } from "./notification.types";

export const NOTIFICATION_TITLE_MAP: Record<NotificationType, string> = {
  MEETING_CONFIRMED: "모임 확정",
  MEETING_CANCELED: "모임 취소",
  MEETING_DELETED: "모임 삭제",
  COMMENT: "새로운 댓글",
};

export const DEFAULT_NOTIFICATION_MODAL_TITLE = "알림 내역";
export const DEFAULT_READ_ALL_LABEL = "모두 읽기";
export const DEFAULT_EMPTY_MESSAGE = "아직 알림이 없어요";
