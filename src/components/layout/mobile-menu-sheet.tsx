'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IconMenu, IconPerson } from '@/components/icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CountBadge } from '@/components/ui/badge';
import { NAV_LINKS } from '@/constants/navigation';
import { Logo } from '@/components/ui/logo';

interface MobileMenuSheetProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isLoggedIn: boolean;
}

export function MobileMenuSheet({
  isOpen,
  setIsOpen,
  isLoggedIn,
}: MobileMenuSheetProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <button className="flex p-1 text-slate-600 hover:text-neutral-900">
          <IconMenu className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-75 sm:w-85 p-0 flex flex-col bg-white"
      >
        <SheetHeader className="p-4 border-b border-gray-100 text-left">
          <SheetTitle>
            <Logo size="sm" />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          {/* User Profile in Mobile Sheet */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 mb-8 p-2">
              <div className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400 shrink-0">
                <IconPerson className="size-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-neutral-900">
                  럽윈즈올
                </span>
                <span className="text-sm font-medium text-slate-500">
                  lovewins@codeit.com
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-8 p-2">
              <span className="text-base font-medium text-neutral-700">
                로그인이 필요합니다
              </span>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-green-500"
              >
                로그인
              </Link>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-xl text-base transition-colors',
                  pathname === link.href
                    ? 'bg-green-50 font-semibold text-green-500'
                    : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-neutral-900',
                )}
              >
                {link.label}
                {link.hasBadge && isLoggedIn && (
                  <div className="ml-auto">
                    <CountBadge count={1} />
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
