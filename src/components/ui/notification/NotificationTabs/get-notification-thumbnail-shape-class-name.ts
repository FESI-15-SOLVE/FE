import type { NotificationType } from "../notification.types";

export function getNotificationThumbnailShapeClassName(
  notificationType: NotificationType,
): string {
  return notificationType === "COMMENT" ? "rounded-full" : "rounded-lg";
}
