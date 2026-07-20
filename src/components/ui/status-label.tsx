import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const statusLabelVariants = cva(
  "inline-flex shrink-0 items-center justify-center select-none font-medium text-green-600 transition-colors",
  {
    variants: {
      size: {
        sm: "text-xs gap-1 [&_.check-circle]:size-4 [&_svg]:size-2.5",
        lg: "text-sm gap-1.5 [&_.check-circle]:size-5 [&_svg]:size-3 ",
        responsive:
          "text-xs gap-1 md:text-sm md:gap-1.5 [&_.check-circle]:size-4 md:[&_.check-circle]:size-5 [&_svg]:size-2.5 md:[&_svg]:size-3",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  },
);

export interface StatusLabelProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusLabelVariants> {
  label?: string;
}

export function StatusLabel({
  className,
  size,
  label = "개설확정",
  ...props
}: StatusLabelProps) {
  return (
    <div className={cn(statusLabelVariants({ size, className }))} {...props}>
      <span className="check-circle from-gradient-start-500 to-gradient-end-500 inline-flex shrink-0 items-center justify-center self-center rounded-full bg-linear-to-r text-white">
        <Check className="" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export { statusLabelVariants };
