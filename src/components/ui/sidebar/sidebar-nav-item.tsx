import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import IconChevronRight from "@/assets/icons/chevron_right.svg";
import { CountBadge } from "@/components/ui/badge";

const sidebarNavItemVariants = cva(
  [
    "group/sidebar-nav-item flex w-full items-center justify-between gap-2",
    "rounded-12 px-4 py-3",
    "font-sans text-base font-medium leading-6 tracking-[-0.32px]",
    "transition-colors select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "hover:bg-slate-50",
  ],
  {
    variants: {
      isActive: {
        true: "text-green-500",
        false: "text-slate-700",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface SidebarNavItemProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof sidebarNavItemVariants> {
  label: string;
  href: string;
  badgeCount?: number;
  isActive?: boolean;
}

export function SidebarNavItem({
  label,
  href,
  badgeCount,
  isActive = false,
  className,
  ...props
}: SidebarNavItemProps) {
  const hasBadge = typeof badgeCount === "number" && badgeCount > 0;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(sidebarNavItemVariants({ isActive }), className)}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="truncate">{label}</span>
        {hasBadge && (
          <CountBadge count={badgeCount} size="sm" aria-label={`${badgeCount}개`} />
        )}
      </span>
      <IconChevronRight
        className="size-4 shrink-0 text-slate-400 group-hover/sidebar-nav-item:text-current"
        aria-hidden="true"
      />
    </Link>
  );
}

export { sidebarNavItemVariants };
export default SidebarNavItem;
