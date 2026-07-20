"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, X } from "lucide-react";

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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    const content = mobileMenuContentRef.current;
    if (!menu || !content) return;

    timelineRef.current?.kill();

    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.34, ease: "power3.out" } });
    tl.set(menu, { display: "block", overflow: "hidden", autoAlpha: 0, height: 0 });
    tl.to(menu, { height: "auto", autoAlpha: 1 });

    tl.eventCallback("onReverseComplete", () => gsap.set(menu, { display: "none" }));

    timelineRef.current = tl;

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isMobileMenuOpen) tl.play();
    else tl.reverse();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 745px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);

        const menu = mobileMenuRef.current;
        if (!menu) return;

        timelineRef.current?.reverse();
        gsap.set(menu, { clearProps: "all" });
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [isMobileMenuOpen]);

  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md w-full">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center mr-6">
          <picture>
            <source media="(min-width: 745px)" srcSet="/src/assets/svg/logo_pc.svg" />
            <img src="/src/assets/svg/logo_mo.svg" alt="같이달램 로고" className="h-10 w-auto" />
          </picture>
        </Link>

        <div className="hidden desktop-flex items-center gap-6 text-sm font-medium text-zinc-700">
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

        <div className="flex items-center gap-3 ml-auto">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="hidden desktop-inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100"
                aria-label="알림"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="hidden desktop-inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 transition hover:ring-2"
                aria-label="프로필"
              >
                <User className="h-5 w-5" />
              </button>
            </>
          ) : (
            <div className="hidden desktop-inline-flex items-center gap-3">
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition duration-300 hover:bg-zinc-100 desktop-hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className="overflow-hidden border-t border-zinc-200 bg-white hidden desktop-hidden"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div ref={mobileMenuContentRef} className="space-y-2 px-4 py-4">
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