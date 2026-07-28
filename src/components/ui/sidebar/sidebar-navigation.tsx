"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import IconDelete from "@/assets/icons/delete.svg";
import { SidebarNavItem } from "./sidebar-nav-item";

export interface SidebarNavItemData {
  id: string;
  label: string;
  href: string;
  badgeCount?: number;
}

export interface SidebarNavigationProps {
  items: SidebarNavItemData[];
  activeId?: string;
  isOpen?: boolean;
  loginHref?: string;
  showLogin?: boolean;
  onClose?: () => void;
  className?: string;
}

export function SidebarNavigation({
  items,
  activeId,
  isOpen = true,
  loginHref = "/login",
  showLogin = false,
  onClose,
  className,
}: SidebarNavigationProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="사이드바 메뉴"
      className={cn(
        "flex h-full w-75 flex-col rounded-2xl bg-white px-4 pb-6 pt-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-start">
        <button
          type="button"
          onClick={onClose}
          aria-label="사이드바 닫기"
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-lg text-slate-500",
            "transition-colors hover:bg-slate-50 hover:text-slate-700",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <IconDelete className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="주요 메뉴" className="flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            label={item.label}
            href={item.href}
            badgeCount={item.badgeCount}
            isActive={activeId === item.id}
            onClick={onClose}
          />
        ))}
      </nav>

      {showLogin && (
        <div className="mt-auto flex justify-end px-2 pt-4">
          <Link
            href={loginHref}
            className={cn(
              "text-sm font-medium text-slate-400 transition-colors",
              "hover:text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            onClick={onClose}
          >
            로그인
          </Link>
        </div>
      )}
    </aside>
  );
}

export default SidebarNavigation;
