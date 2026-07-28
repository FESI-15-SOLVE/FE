import type { Notification } from "@/api/data-contracts";
import type { NotificationType } from "@/components/ui/notification";

/** API 응답의 알림 한 건 (Swagger Notification과 동일) */
export type NotificationItem = Notification;

/** 알림 목록 조회 훅 옵션 */
export interface NotificationListQueryOptions {
  teamId: string;
  cursor?: string;
  size?: number;
  isRead?: "true" | "false";
  requestHeaders?: HeadersInit;
  enabled?: boolean;
}

/** 읽음 처리 mutation 공통 옵션 */
export interface NotificationMutationOptions {
  teamId: string;
  requestHeaders?: HeadersInit;
}

/** 미읽음 개수 조회 훅 옵션 */
export interface UnreadNotificationCountQueryOptions {
  teamId: string;
  requestHeaders?: HeadersInit;
  enabled?: boolean;
}

/**
 * NotificationTabs(UI)에 넘기기 위한 뷰 모델.
 * API 필드명(type, data.image)과 UI props명을 맞추기 위한 중간 형태입니다.
 */
export interface NotificationTabsItemViewModel {
  id: number;
  notificationType: NotificationType;
  message: string;
  imageSrc?: string | null;
  createdAt?: string | null;
  isRead: boolean;
}

/** API Notification → Tabs props 형태로 변환 */
export function mapNotificationItemToViewModel(
  notificationItem: NotificationItem,
): NotificationTabsItemViewModel {
  return {
    id: notificationItem.id,
    notificationType: notificationItem.type,
    message: notificationItem.message,
    imageSrc: notificationItem.data?.image ?? null,
    createdAt: notificationItem.createdAt,
    isRead: notificationItem.isRead,
  };
}
