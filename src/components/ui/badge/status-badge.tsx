import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { StatusLabel } from "@/components/ui/status-label";

const statusBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full select-none transition-colors",
  {
    variants: {
      status: {
        upcoming: "bg-green-200 text-green-700 font-semibold",
        completed: "bg-slate-100 text-slate-500 font-medium",
        confirmed: "bg-white text-slate-600 font-medium border-gradient-500",
        pending: "border border-slate-200 bg-white text-slate-600 font-medium",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs gap-1",
        lg: "px-3.5 py-1 text-sm gap-1.5",
        responsive: "px-3 py-1 text-xs md:text-sm gap-1 md:gap-1.5",
      },
    },
    defaultVariants: {
      status: "upcoming",
      size: "responsive",
    },
  },
);

export interface StatusBadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  status?: "confirmed" | "pending" | "completed" | "upcoming";
  label?: string;
}

export function StatusBadge({
  className,
  status = "upcoming",
  size,
  label,
  ...props
}: StatusBadgeProps) {
  const defaultLabels: Record<
    NonNullable<StatusBadgeProps["status"]>,
    string
  > = {
    confirmed: "개설확정",
    pending: "개설대기",
    completed: "이용완료",
    upcoming: "이용예정",
  };

  const displayLabel = label ?? defaultLabels[status];

  if (status === "confirmed") {
    return (
      <Badge
        className={cn(statusBadgeVariants({ status, size, className }))}
        {...props}
      >
        <StatusLabel size="lg" label={displayLabel} />
      </Badge>
    );
  }

  return (
    <Badge
      className={cn(statusBadgeVariants({ status, size, className }))}
      {...props}
    >
      <span>{displayLabel}</span>
    </Badge>
  );
}

export { statusBadgeVariants };
