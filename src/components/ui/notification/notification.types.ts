import type { Notification } from "@/api/data-contracts";

export type NotificationType = Notification["type"];
export type NotificationItem = Notification;

export interface NotificationListQueryOptions {
  teamId: string;
  cursor?: string;
  size?: number;
  isRead?: "true" | "false";
  requestHeaders?: HeadersInit;
  enabled?: boolean;
}

export interface NotificationMutationOptions {
  teamId: string;
  requestHeaders?: HeadersInit;
}

export interface NotificationTabsItemViewModel {
  id: number;
  notificationType: NotificationType;
  message: string;
  imageSrc?: string | null;
  createdAt?: string | null;
  isRead: boolean;
}
