import type { HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";

const categoryTabVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden px-1",
    "size-34",
    "rounded-[var(--radius-16)]",
    "select-none cursor-pointer transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
  ],
  {
    variants: {
      isSelected: {
        true: "bg-green-100 border border-gradient-500",
        false: "bg-slate-50",
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

export interface CategoryTabProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "children"
> {
  label: string;
  imageUrl: string;
  imageAlt?: string;
  isSelected?: boolean;
}

export function CategoryTab({
  label,
  imageUrl,
  imageAlt = "",
  isSelected = false,
  className,
  ...props
}: CategoryTabProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={label}
      className={cn(categoryTabVariants({ isSelected }), className)}
      {...props}
    >
      <span
        className={cn(
          "flex flex-col items-center justify-center",
          isSelected ? "gap-2" : "gap-1.5",
        )}
      >
        {/* 카테고리 이미지 — 80×80 고정 */}
        <span className="relative size-20 shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="80px"
            className="pointer-events-none object-cover"
          />
        </span>

        {/* 카테고리 레이블 */}
        <span className="font-sans text-sm leading-5 font-medium tracking-[-0.28px] whitespace-nowrap text-slate-800">
          {label}
        </span>
      </span>
    </button>
  );
}

export { categoryTabVariants };
export default CategoryTab;
