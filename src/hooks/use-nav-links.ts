'use client';

import { NAV_LINKS, NavLink } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

export function useNavLinks(isLoggedIn: boolean): NavLink[] {
  return isLoggedIn
    ? [...NAV_LINKS, { href: ROUTES.MY_PAGE.INDEX, label: '마이페이지' }]
    : NAV_LINKS;
}
