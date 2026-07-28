"use client";

import { cn } from "@/lib/utils";

import { NOTIFICATION_TITLE_MAP } from "../notification.constants";
import { NotificationThumbnail } from "./notification-thumbnail";
import { NotificationTitle } from "./notification-title";
import { notificationTabsVariants } from "./notification-tabs.variants";
import type { NotificationTabsProps } from "./notification-tabs.types";
import { useFormattedRelativeTime } from "./use-formatted-relative-time";

export function NotificationTabs({
  className,
  notificationType,
  message,
  imageSrc,
  createdAt,
  relativeTime,
  title,
  isRead = true,
  ...props
}: NotificationTabsProps) {
  const displayTitle = title ?? NOTIFICATION_TITLE_MAP[notificationType];
  const displayRelativeTime = useFormattedRelativeTime(
    createdAt,
    relativeTime,
  );

  return (
    <button
      type="button"
      className={cn(notificationTabsVariants({ isRead, className }))}
      data-slot="notification-tabs"
      data-type={notificationType}
      data-read={isRead}
      {...props}
    >
      <NotificationThumbnail
        notificationType={notificationType}
        imageSrc={imageSrc}
        title={displayTitle}
      />

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-start justify-between gap-2">
          <NotificationTitle
            notificationType={notificationType}
            title={displayTitle}
          />
          {displayRelativeTime && (
            <time
              className="shrink-0 text-xs font-medium text-slate-400"
              dateTime={createdAt ?? undefined}
            >
              {displayRelativeTime}
            </time>
          )}
        </span>
        <span className="line-clamp-2 text-sm leading-5 text-slate-600">
          {message}
        </span>
      </span>
    </button>
  );
}
