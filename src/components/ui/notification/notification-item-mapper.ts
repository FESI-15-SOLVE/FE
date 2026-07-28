import type { NotificationItem, NotificationTabsItemViewModel } from "./notification.types";

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
