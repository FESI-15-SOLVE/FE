import { Button } from "@/components/ui/button";

import type { NotificationModalHeaderProps } from "./notification-modal.types";

export function NotificationModalHeader({
  title,
  readAllLabel,
  onReadAll,
  isReadAllDisabled,
}: NotificationModalHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
      <h2 className="text-base font-semibold text-slate-800">{title}</h2>
      <Button
        type="button"
        variant="ghost"
        size="custom"
        className="h-auto px-0 py-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-700 disabled:text-slate-300"
        onClick={onReadAll}
        disabled={isReadAllDisabled}
      >
        {readAllLabel}
      </Button>
    </header>
  );
}
