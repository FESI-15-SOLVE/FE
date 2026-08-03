'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconMenu from '@/assets/icons/menu.svg';
import IconDelete from '@/assets/icons/delete.svg';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/constants/navigation';
import { MobileMenuNav } from './mobile-menu-nav';
import { useAuthStore } from '@/providers/auth-provider';
import { logoutAction } from '@/actions/auth/auth-actions';
import { unwrapAction } from '@/lib/safe-action';

interface MobileMenuSheetProps {
  isLoggedIn: boolean;
}

export function MobileMenuSheet({
  isLoggedIn,
}: MobileMenuSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      unwrapAction(await logoutAction());
    } finally {
      clearAuth();
      router.push('/sign-in');
    }
  };

  // 로그인 상태에 따라 '마이페이지' 링크 추가
  const links = isLoggedIn
    ? [...NAV_LINKS, { href: '/mypage', label: '마이페이지' }]
    : NAV_LINKS;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <IconMenu className="size-6 flex text-slate-600 hover:text-neutral-900 cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-78.5 p-0 flex flex-col bg-white rounded-l-[24px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] border-none"
      >
        <div className="flex flex-col h-full pt-6 pb-4">
          {/* 상단 닫기 버튼 */}
          <div className="flex items-center px-6 mb-6 shrink-0">
            <SheetClose className="flex size-6 items-center justify-center text-neutral-900 hover:opacity-80 transition-opacity outline-none cursor-pointer">
              <IconDelete className="size-full" />
            </SheetClose>
          </div>

          {/* 네비게이션 링크 목록 */}
          <MobileMenuNav
            links={links}
            isLoggedIn={isLoggedIn}
            onLinkClick={() => setIsOpen(false)}
          />

          {/* 하단 로그인/로그아웃 버튼 */}
          <div className="flex justify-end px-4 mt-auto">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="p-4 text-base font-medium text-neutral-400 hover:text-neutral-900 tracking-[-0.32px] transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="p-4 text-base font-medium text-neutral-400 hover:text-neutral-900 tracking-[-0.32px] transition-colors cursor-pointer"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
