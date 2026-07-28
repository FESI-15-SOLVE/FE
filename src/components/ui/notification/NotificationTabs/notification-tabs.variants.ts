import { cva } from "class-variance-authority";

export const notificationTabsVariants = cva(
  "flex h-[90px] w-full shrink-0 items-center gap-3 rounded-xl px-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-green-500/40",
  {
    variants: {
      isRead: {
        true: "bg-white hover:bg-slate-50",
        false: "bg-green-100/40 hover:bg-green-100/60",
      },
    },
    defaultVariants: {
      isRead: true,
    },
  },
);
