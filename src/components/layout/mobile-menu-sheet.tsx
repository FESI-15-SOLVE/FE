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
import { MobileMenuNav } from './mobile-menu-nav';
import { useAuthStore } from '@/providers/auth-provider';
import { logoutAction } from '@/actions/auth/auth-actions';
import { unwrapAction } from '@/lib/safe-action';
import { useNavLinks } from '@/hooks/use-nav-links';
import { ROUTES } from '@/constants/routes';

interface MobileMenuSheetProps {
  isLoggedIn: boolean;
}

export function MobileMenuSheet({
  isLoggedIn,
}: MobileMenuSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const links = useNavLinks(isLoggedIn);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      unwrapAction(await logoutAction());
    } finally {
      clearAuth();
      router.push(ROUTES.AUTH.SIGN_IN);
    }
  };

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
        {/* 드로어 상단 닫기 영역 */}
        <div className="flex justify-end p-6 border-b border-slate-100">
          <SheetClose className="focus:outline-none">
            <IconDelete className="size-6 text-slate-600 hover:text-slate-900 cursor-pointer" />
          </SheetClose>
        </div>

        {/* 내비게이션 메뉴 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <MobileMenuNav
            links={links}
            isLoggedIn={isLoggedIn}
            onLinkClick={() => setIsOpen(false)}
          />
        </div>

        {/* 하단 인증 버튼 영역 */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-bl-[24px]">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left font-bold text-slate-500 hover:text-slate-900 py-2 text-base transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href={ROUTES.AUTH.SIGN_IN} onClick={() => setIsOpen(false)}>
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 text-center transition-colors cursor-pointer"
                >
                  로그인
                </button>
              </Link>
              <Link href={ROUTES.AUTH.SIGN_UP} onClick={() => setIsOpen(false)}>
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  회원가입
                </button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
