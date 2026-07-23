import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

const countBadgeVariants = cva(
  "inline-flex items-center justify-center font-bold text-white bg-green-500 rounded-full shrink-0 select-none border-0 p-0",
  {
    variants: {
      size: {
        sm: "h-3 min-w-3 text-[10px] leading-none",
        lg: "h-4.5 min-w-5 px-1.5 text-xs leading-none",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

export interface CountBadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof countBadgeVariants> {
  count?: number;
  max?: number;
}

export function CountBadge({
  className,
  size = "lg",
  count = 1,
  max = 99,
  ...props
}: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count + "";

  return (
    <Badge className={cn(countBadgeVariants({ size, className }))} {...props}>
      {displayCount}
    </Badge>
  );
}

export { countBadgeVariants };
