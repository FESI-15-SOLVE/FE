"use client";

import { Children } from "react";

import { Button } from "@/components/ui/button/button";
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
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <Button
          type="button"
          variant="ghost"
          size="custom"
          className="h-auto px-0 py-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-700 disabled:text-slate-300"
          onClick={onReadAll}
          disabled={isReadAllButtonDisabled}
        >
          {readAllLabel}
        </Button>
      </header>

      {shouldShowEmpty ? (
        <div className="flex min-h-0 flex-1 items-center justify-center px-4">
          <p className="text-sm font-medium text-slate-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto p-2">{children}</div>
      )}
    </section>
  );
}
