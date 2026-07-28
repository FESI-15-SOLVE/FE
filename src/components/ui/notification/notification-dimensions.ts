/** Figma 알림 모달·탭 레이아웃 (px) */
export const NOTIFICATION_MODAL_WIDTH_PX = 314;
export const NOTIFICATION_MODAL_HEIGHT_EMPTY_PX = 204;
export const NOTIFICATION_MODAL_HEIGHT_SHORT_PX = 448;
export const NOTIFICATION_MODAL_HEIGHT_LONG_PX = 812;
export const NOTIFICATION_TAB_HEIGHT_PX = 90;

/** Tailwind arbitrary value 클래스 */
export const NOTIFICATION_MODAL_WIDTH_CLASS = "w-[314px]";
export const NOTIFICATION_MODAL_HEIGHT_EMPTY_CLASS = "h-[204px]";
export const NOTIFICATION_MODAL_HEIGHT_SHORT_CLASS = "h-[448px]";
export const NOTIFICATION_MODAL_HEIGHT_LONG_CLASS = "h-[812px]";
export const NOTIFICATION_TAB_HEIGHT_CLASS = "h-[90px]";

export type NotificationModalListSize = "short" | "long";

export function getNotificationModalHeightClassName(
  shouldShowEmpty: boolean,
  listSize: NotificationModalListSize,
): string {
  if (shouldShowEmpty) {
    return NOTIFICATION_MODAL_HEIGHT_EMPTY_CLASS;
  }

  return listSize === "long"
    ? NOTIFICATION_MODAL_HEIGHT_LONG_CLASS
    : NOTIFICATION_MODAL_HEIGHT_SHORT_CLASS;
}
