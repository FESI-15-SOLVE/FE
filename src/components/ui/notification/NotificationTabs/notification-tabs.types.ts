import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import type { NotificationType } from "../notification.types";
import type { notificationTabsVariants } from "./notification-tabs.variants";

export interface NotificationTabsProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "title">,
    VariantProps<typeof notificationTabsVariants> {
  notificationType: NotificationType;
  message: string;
  imageSrc?: string | null;
  createdAt?: string | null;
  /** 상대 시간 문구를 직접 넘기면 createdAt 포맷 대신 사용합니다. */
  relativeTime?: string;
  /** 기본 타입 제목 대신 커스텀 제목을 사용할 때 */
  title?: string;
  isRead?: boolean;
}
