'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconPerson } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/features/notification/components/notification-bell';
import { useAuthStore } from '@/providers/auth-provider';
import { logoutAction } from '@/actions/auth/auth-actions';
import { unwrapAction } from '@/lib/safe-action';
import { MobileMenuSheet } from './mobile-menu-sheet';

export function GnbUserActions() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    try {
      unwrapAction(await logoutAction());
    } finally {
      clearAuth();
      router.push('/sign-in');
    }
  };

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      {isLoggedIn ? (
        <>
          <NotificationBell />

          <div className="hidden sm:flex items-center gap-4">
            {/* 데스크톱 유저 정보 */}
            <Button
              variant={'custom'}
              size={'icon'}
              className="size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400 relative"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <IconPerson className="size-6" />
              )}
            </Button>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              로그아웃
            </button>
          </div>

          {/* 모바일 액션 */}
          <div className="flex sm:hidden items-center gap-3">
            <MobileMenuSheet isLoggedIn={isLoggedIn} />
          </div>
        </>
      ) : (
        <>
          {/* 데스크톱 로그인 버튼 */}
          <div className="hidden sm:flex items-center px-4 py-2">
            <Link
              href="/sign-in"
              className="text-base font-medium text-slate-600 hover:text-neutral-900 tracking-[-0.32px]"
            >
              로그인
            </Link>
          </div>

          {/* 모바일 액션 */}
          <div className="flex sm:hidden items-center gap-3">
            <MobileMenuSheet isLoggedIn={isLoggedIn} />
          </div>
        </>
      )}
    </div>
  );
}
