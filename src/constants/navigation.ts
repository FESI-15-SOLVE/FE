import { ROUTES } from './routes';

export interface NavLink {
  href: string;
  label: string;
  hasBadge?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: ROUTES.MEETINGS.LIST, label: '모임 찾기' },
  { href: ROUTES.SAVED, label: '찜한 모임', hasBadge: true },
  { href: ROUTES.REVIEWS, label: '모든 리뷰' },
  { href: ROUTES.TALK, label: '달램 토크' },
];
