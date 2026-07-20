import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex shrink-0 items-center gap-1 select-none transition-colors",
  {
    variants: {
      variant: {
        default: "border border-slate-200 bg-white text-slate-600 font-medium",
        accent: "bg-blue-100 text-blue-600 font-semibold",
        success: "bg-green-100 text-green-700 font-semibold",
      },
      size: {
        sm: "h-5 rounded-md px-2 text-xs",
        lg: "h-6 rounded-lg px-3 text-sm",
        responsive:
          "h-5 rounded-md px-2 text-xs md:h-6 md:rounded-lg md:px-3 md:text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "responsive",
    },
  },
);

export interface TagProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  /** 태그 내부 좌측 아이콘 */
  icon?: React.ReactNode;
}

function Tag({ className, variant, size, icon, children, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, size, className }))} {...props}>
      {icon && (
        <span className="inline-flex shrink-0 items-center">{icon}</span>
      )}
      <span>{children}</span>
    </div>
  );
}

export { Tag, tagVariants };
