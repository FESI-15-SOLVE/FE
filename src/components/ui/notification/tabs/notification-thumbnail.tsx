import { IconPerson } from "@/components/icons";
import { cn } from "@/lib/utils";

import type { NotificationType } from "../notification.types";

export interface NotificationThumbnailProps {
  notificationType: NotificationType;
  imageSrc?: string | null;
  title: string;
}

function getThumbnailShapeClassName(notificationType: NotificationType) {
  return notificationType === "COMMENT" ? "rounded-full" : "rounded-lg";
}

export function NotificationThumbnail({
  notificationType,
  imageSrc,
  title,
}: NotificationThumbnailProps) {
  const shapeClassName = getThumbnailShapeClassName(notificationType);

  if (imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 알림 이미지는 API 호스트가 가변적이라 img 사용
      <img
        src={imageSrc}
        alt={`${title} 썸네일`}
        className={cn(
          "size-10 shrink-0 bg-slate-100 object-cover",
          shapeClassName,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center bg-slate-100 text-slate-400",
        shapeClassName,
      )}
      aria-hidden="true"
    >
      <IconPerson className="size-5" />
    </span>
  );
}
