"use client";

import { Children } from "react";

import { cn } from "@/lib/utils";

import {
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_NOTIFICATION_MODAL_TITLE,
  DEFAULT_READ_ALL_LABEL,
} from "../notification.constants";
import {
  getNotificationModalHeightClassName,
  NOTIFICATION_MODAL_WIDTH_CLASS,
} from "../notification-dimensions";
import { NotificationModalEmpty } from "./notification-modal-empty";
import { NotificationModalHeader } from "./notification-modal-header";
import type { NotificationModalProps } from "./notification-modal.types";

export function NotificationModal({
  className,
  title = DEFAULT_NOTIFICATION_MODAL_TITLE,
  readAllLabel = DEFAULT_READ_ALL_LABEL,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  isEmpty,
  onReadAll,
  isReadAllDisabled = false,
  listSize = "short",
  children,
  ...props
}: NotificationModalProps) {
  const hasNotificationItems = Children.count(children) > 0;
  const shouldShowEmpty = isEmpty ?? !hasNotificationItems;
  const isReadAllButtonDisabled =
    isReadAllDisabled || shouldShowEmpty || !onReadAll;

  return (
    <section
      role="dialog"
      aria-label={title}
      data-slot="notification-modal"
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg",
        NOTIFICATION_MODAL_WIDTH_CLASS,
        getNotificationModalHeightClassName(shouldShowEmpty, listSize),
        className,
      )}
      {...props}
    >
      <NotificationModalHeader
        title={title}
        readAllLabel={readAllLabel}
        onReadAll={onReadAll}
        isReadAllDisabled={isReadAllButtonDisabled}
      />

      {shouldShowEmpty ? (
        <NotificationModalEmpty emptyMessage={emptyMessage} />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto p-2">{children}</div>
      )}
    </section>
  );
}
