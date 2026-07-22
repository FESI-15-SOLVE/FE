"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, Menu, User, X } from "lucide-react";
import { NotificationPanel, initialNotifications, type NotificationItem } from "@/components/ui/notification";

interface GnbProps {
  isLoggedIn?: boolean;
  notificationCounts?: Partial<Record<(typeof menuItems)[number]["label"], number>>;
}

const menuItems = [
  { label: "모임 찾기", href: "/events" },
  { label: "찜한 모임", href: "/favorites" },
  { label: "모든 리뷰", href: "/reviews" },
  { label: "달램 토크", href: "/talk" },
] as const;

export function Gnb({ isLoggedIn = false, notificationCounts = {} }: GnbProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [shouldRenderNotificationPanel, setShouldRenderNotificationPanel] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const panelContainerRef = useRef<HTMLDivElement | null>(null);

  const unreadNotificationCount = notifications.filter((notification) => !notification.isRead).length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 745px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelContainerRef.current &&
        !panelContainerRef.current.contains(event.target as Node)
      ) {
        setIsNotificationPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isNotificationPanelOpen) {
      setShouldRenderNotificationPanel(true);
      return;
    }

    if (!isNotificationPanelOpen && shouldRenderNotificationPanel) {
      const timeoutId = window.setTimeout(() => {
        setShouldRenderNotificationPanel(false);
      }, 220);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isNotificationPanelOpen, shouldRenderNotificationPanel]);

  const handleNotificationClick = (id: number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md w-full">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center mr-6">
          <picture>
            <source media="(min-width: 745px)" srcSet="/src/assets/svg/logo_pc.svg" />
            <img src="/src/assets/svg/logo_mo.svg" alt="같이달램 로고" className="h-10 w-auto" />
          </picture>
        </Link>

        <div className="hidden min-[745px]:flex items-center gap-6 text-sm font-medium text-zinc-700">
          {menuItems.map((item) => {
            const count = notificationCounts[item.label] ?? 0;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-150 hover:text-emerald-600"
              >
                <span className="inline-flex items-center gap-2">
                  {item.label}
                  {count > 0 ? (
                    <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-2 text-[0.65rem] font-semibold leading-none text-white">
                      {count}
                    </span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="relative flex items-center gap-3 ml-auto" ref={panelContainerRef}>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="hidden min-[745px]:inline-flex relative h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100"
                aria-label="알림"
                aria-expanded={isNotificationPanelOpen}
                onClick={() => {
                  if (isNotificationPanelOpen) {
                    setIsNotificationPanelOpen(false);
                  } else {
                    setShouldRenderNotificationPanel(true);
                    setIsNotificationPanelOpen(true);
                  }
                }}
              >
                <Bell className="h-5 w-5" />
                {unreadNotificationCount > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                ) : null}
              </button>
              <button
                type="button"
                className="inline-flex min-[745px]:hidden relative h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition duration-300 hover:bg-zinc-100"
                aria-label={isNotificationPanelOpen ? "알림 닫기" : "알림 열기"}
                aria-expanded={isNotificationPanelOpen}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (isNotificationPanelOpen) {
                    setIsNotificationPanelOpen(false);
                  } else {
                    setShouldRenderNotificationPanel(true);
                    setIsNotificationPanelOpen(true);
                  }
                }}
              >
                {isNotificationPanelOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Bell className="h-5 w-5" />
                )}
                {unreadNotificationCount > 0 && !isNotificationPanelOpen ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                ) : null}
              </button>
              <button
                type="button"
                className="hidden min-[745px]:inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 transition hover:ring-2"
                aria-label="프로필"
              >
                <User className="h-5 w-5" />
              </button>
              {shouldRenderNotificationPanel ? (
                <NotificationPanel
                  isOpen={isNotificationPanelOpen}
                  notifications={notifications}
                  onNotificationClick={handleNotificationClick}
                  onMarkAllRead={handleMarkAllRead}
                />
              ) : null}
            </>
          ) : (
            <div className="hidden min-[745px]:inline-flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-zinc-700 transition hover:text-emerald-600"
              >
                회원가입
              </Link>
            </div>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition duration-300 hover:bg-zinc-100 min-[745px]:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => {
              setIsNotificationPanelOpen(false);
              setIsMobileMenuOpen((current) => !current);
            }}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="overflow-hidden border-t border-zinc-200 bg-white min-[745px]:hidden" style={{ display: isMobileMenuOpen ? "block" : "none" }}>
        <div className="space-y-2 px-4 py-4">
          {menuItems.map((item) => {
            const count = notificationCounts[item.label] ?? 0;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <span>{item.label}</span>
                {count > 0 ? (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-2 text-[0.65rem] font-semibold leading-none text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <Link
                href="/notifications"
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <span>알림</span>
                <Bell className="h-5 w-5 text-zinc-600" />
              </Link>
              <Link
                href="/profile"
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <span>프로필</span>
                <User className="h-5 w-5 text-zinc-600" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-500 bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}