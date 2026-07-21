import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { EmptyIllustration } from "./empty-illustration";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center font-sans select-none w-full",
  {
    variants: {
      size: {
        sm: "gap-5",
        lg: "gap-6",
        responsive: "gap-5 md:gap-6",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  },
);

const messageVariants = cva("font-medium text-slate-500 text-center", {
  variants: {
    size: {
      sm: "text-sm leading-5 tracking-[-0.28px]",
      lg: "text-base leading-6 tracking-[-0.32px]",
      responsive:
        "text-sm leading-5 tracking-[-0.28px] md:text-base md:leading-6 md:tracking-[-0.32px]",
    },
  },
  defaultVariants: {
    size: "responsive",
  },
});

export interface EmptyStateProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  message?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  className,
  size,
  message = "아직 만든 모임이 없어요",
  description,
  icon,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ size, className }))} {...props}>
      <div className="shrink-0">{icon ?? <EmptyIllustration />}</div>

      <div className="space-y-1">
        {typeof message === "string" ? (
          <p className={cn(messageVariants({ size }))}>{message}</p>
        ) : (
          message
        )}
        {description && (
          <p className="text-xs leading-normal text-slate-400">{description}</p>
        )}
      </div>

      {action && <div className="mt-2 shrink-0">{action}</div>}
    </div>
  );
}

export { emptyStateVariants };
export default EmptyState;
