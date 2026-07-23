'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconBell, IconPerson } from '@/components/icons';
import { CountBadge } from '@/components/ui/badge';
import { NAV_LINKS } from '@/constants/navigation';
import { Logo } from '@/components/ui/logo';
import { MobileMenuSheet } from './mobile-menu-sheet';
import { Button } from '@/components/ui/button';

interface GnbProps {
  isLoggedIn?: boolean;
}

export function GlobalNavigationBar({ isLoggedIn = true }: GnbProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f6f7f9] border-b border-gray-200">
      <div className="mx-auto flex h-14 sm:h-16 max-w-300 items-center justify-between px-4 sm:px-6">
        {/* Left: Logo & Desktop Navigation */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* Desktop Navigation */}
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

        {/* Right: Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Desktop User Info */}
              <div className="hidden sm:flex items-center gap-6">
                <Button
                  variant={'custom'}
                  size={'icon-sm'}
                  className="relative flex items-center justify-center p-1 text-slate-600 hover:text-neutral-900"
                >
                  <IconBell className="size-6" />
                  <span className="absolute right-1 top-1 flex size-1.5 rounded-full bg-green-500" />
                </Button>
                <Button
                  variant={'custom'}
                  size={'icon'}
                  className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400"
                >
                  <IconPerson className="size-6" />
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="flex sm:hidden items-center gap-3">
                <button className="relative flex items-center justify-center p-1 text-slate-600">
                  <IconBell className="size-5" />
                  <span className="absolute right-1 top-1 flex size-1.5 rounded-full bg-green-500" />
                </button>
                <MobileMenuSheet
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            </>
          ) : (
            <>
              {/* Desktop Login Button */}
              <div className="hidden sm:flex items-center px-4 py-2">
                <Link
                  href="/login"
                  className="text-base font-medium text-slate-600 hover:text-neutral-900 tracking-[-0.32px]"
                >
                  로그인
                </Link>
              </div>

              {/* Mobile Actions */}
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
