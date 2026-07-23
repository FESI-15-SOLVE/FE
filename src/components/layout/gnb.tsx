'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconPerson } from '@/components/icons';
import { CountBadge } from '@/components/ui/badge';
import { NAV_LINKS } from '@/constants/navigation';
import { Logo } from '@/components/ui/logo';
import { MobileMenuSheet } from './mobile-menu-sheet';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/features/notification/components/notification-bell';

interface GnbProps {
  isLoggedIn?: boolean;
}

export function GlobalNavigationBar({ isLoggedIn = true }: GnbProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f6f7f9] border-b border-gray-200">
      <div className="mx-auto flex h-14 sm:h-16 max-w-300 items-center justify-between px-4 sm:px-6">
        {/* 좌측: 로고 및 데스크톱 네비게이션 */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden sm:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1 px-1 py-2 text-base tracking-[-0.32px] transition-colors',
                  pathname === link.href
                    ? 'font-semibold text-green-500'
                    : 'font-medium text-slate-600 hover:text-neutral-900',
                )}
              >
                {link.label}
                {link.hasBadge && isLoggedIn && <CountBadge count={1} />}
              </Link>
            ))}
          </nav>
        </div>

        {/* 우측: 유저 액션 */}
        <div className="flex items-center gap-3 sm:gap-6">
          {isLoggedIn ? (
            <>
              <NotificationBell />

              {/* 데스크톱 유저 정보 */}
              <Button
                variant={'custom'}
                size={'icon'}
                className="hidden sm:flex size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400"
              >
                <IconPerson className="size-6" />
              </Button>

              {/* 모바일 액션 */}
              <div className="flex sm:hidden items-center">
                <MobileMenuSheet
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </>
          ) : (
            <>
              {/* 데스크톱 로그인 버튼 */}
              <div className="hidden sm:flex items-center px-4 py-2">
                <Link
                  href="/login"
                  className="text-base font-medium text-slate-600 hover:text-neutral-900 tracking-[-0.32px]"
                >
                  로그인
                </Link>
              </div>

              {/* 모바일 액션 */}
              <div className="flex sm:hidden items-center gap-3">
                <MobileMenuSheet
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
