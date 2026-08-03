'use client';

import { usePathname } from 'next/navigation';
import { NAV_LINKS, NavLink } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

export function getPreservedHref(
  pathname: string,
  baseRoute: string,
  defaultRoute: string,
): string {
  return pathname.startsWith(baseRoute) ? pathname : defaultRoute;
}

export function useNavLinks(isLoggedIn: boolean): NavLink[] {
  const pathname = usePathname();

  const myPageHref = getPreservedHref(
    pathname,
    ROUTES.MY_PAGE.ROOT,
    ROUTES.MY_PAGE.JOINED,
  );

  return isLoggedIn
    ? [...NAV_LINKS, { href: myPageHref, label: '마이페이지' }]
    : NAV_LINKS;
}
