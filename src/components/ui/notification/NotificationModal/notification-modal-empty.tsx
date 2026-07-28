import type { NotificationModalEmptyProps } from "./notification-modal.types";

export function NotificationModalEmpty({
  emptyMessage,
}: NotificationModalEmptyProps) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center px-4">
      <p className="text-sm font-medium text-slate-400">{emptyMessage}</p>
    </div>
  );
}
