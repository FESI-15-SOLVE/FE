'use client';

import Link from 'next/link';
import Image from 'next/image';
import IconPerson from '@/assets/icons/person.svg';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/features/notification/components/notification-bell';
import { useAuthStore } from '@/providers/auth-provider';
import { useLogout } from '@/hooks/use-logout';
import { MobileMenuSheet } from './mobile-menu-sheet';
import { useNavLinks } from '@/hooks/use-nav-links';
import { ROUTES } from '@/constants/routes';

export function GnbUserActions() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const links = useNavLinks(isLoggedIn);
  const myPageLink = links.find((link) => link.label === '마이페이지');
  const myPageHref = myPageLink?.href ?? ROUTES.MY_PAGE.JOINED;

  const { logout } = useLogout();

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      {isLoggedIn ? (
        <>
          <NotificationBell />

          <div className="hidden sm:flex items-center gap-4">
            {/* 데스크톱 유저 프로필 버튼 */}
            <Link href={myPageHref} className="cursor-pointer">
              <Button
                variant={'custom'}
                size={'icon'}
                className="size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400 relative cursor-pointer"
              >
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <IconPerson className="size-6 shrink-0" />
                )}
              </Button>
            </Link>

            <Button
              variant={'custom'}
              onClick={logout}
              className="px-4 text-[14px] font-semibold leading-5 shadow-none h-10 transition-colors  text-slate-700  hover:bg-slate-50 cursor-pointer"
            >
              로그아웃
            </Button>
          </div>
        </>
      ) : (
        <div className="hidden sm:flex items-center gap-2">
          <Link href={ROUTES.AUTH.SIGN_IN}>
            <Button
              variant={'custom'}
              className="px-4 text-[14px] font-semibold leading-5 shadow-none h-10 transition-colors  text-slate-700  hover:bg-slate-50 cursor-pointer"
            >
              로그인
            </Button>
          </Link>
        </div>
      )}

      {/* 모바일 햄버거 버튼 & 드로어 */}
      <div className="sm:hidden flex items-center">
        <MobileMenuSheet isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}
