import { IconCheckCircle } from "@/components/icons";

import type { NotificationType } from "../notification.types";

export interface NotificationTitleProps {
  notificationType: NotificationType;
  title: string;
}

export function NotificationTitle({
  notificationType,
  title,
}: NotificationTitleProps) {
  const shouldShowConfirmIcon = notificationType === "MEETING_CONFIRMED";

  return (
    <span className="inline-flex min-w-0 items-center gap-1 text-sm font-semibold text-slate-800">
      <span className="truncate">{title}</span>
      {shouldShowConfirmIcon && (
        <IconCheckCircle
          className="size-4 shrink-0 text-green-500"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
