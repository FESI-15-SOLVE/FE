"use client";

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

  useEffect(() => {
    const menu = mobileMenuRef.current;
    const content = mobileMenuContentRef.current;
    if (!menu || !content) return;

    if (isMobileMenuOpen) {
      gsap.killTweensOf(menu);
      gsap.set(menu, { display: "block" });
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        {
          height: content.scrollHeight,
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          clearProps: "height",
        },
      );
    } else {
      gsap.killTweensOf(menu);
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 sm:px-6 lg:px-8">
        <a href="/" className="inline-flex items-center text-2xl font-semibold text-emerald-600 mr-6">
          같이달램
        </a>

        <div className="hidden [@media(min-width:745px)]:flex items-center gap-6 text-sm font-medium text-zinc-700">
          {menuItems.map((item) => {
            const count = notificationCounts[item.label] ?? 0;
            return (
              <a
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
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="hidden [@media(min-width:745px)]:inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100"
                aria-label="알림"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="hidden [@media(min-width:745px)]:inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 transition hover:ring-2"
                aria-label="프로필"
              >
                <User className="h-5 w-5" />
              </button>
            </>
          ) : (
            <div className="hidden [@media(min-width:745px)]:inline-flex items-center gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="text-sm font-medium text-zinc-700 transition hover:text-emerald-600"
              >
                회원가입
              </a>
            </div>
          )}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition duration-300 hover:bg-zinc-100 [@media(min-width:745px)]:hidden"
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
        className="overflow-hidden border-t border-zinc-200 bg-white [@media(min-width:745px)]:hidden"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div ref={mobileMenuContentRef} className="space-y-2 px-4 py-4">
          {menuItems.map((item) => {
            const count = notificationCounts[item.label] ?? 0;
            return (
              <a
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
              </a>
            );
          })}

          {isLoggedIn ? (
            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <a
                href="/notifications"
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <span>알림</span>
                <Bell className="h-5 w-5 text-zinc-600" />
              </a>
              <a
                href="/profile"
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                <span>프로필</span>
                <User className="h-5 w-5 text-zinc-600" />
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <a
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-500 bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
              >
                회원가입
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}