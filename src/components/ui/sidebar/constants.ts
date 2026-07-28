import type { SidebarNavItemData } from "./sidebar-navigation";

export const DEFAULT_SIDEBAR_NAV_ITEMS: SidebarNavItemData[] = [
  { id: "meetings", label: "모임 찾기", href: "/meetings" },
  { id: "favorites", label: "찜한 모임", href: "/favorites", badgeCount: 1 },
  { id: "reviews", label: "모든 리뷰", href: "/reviews" },
  { id: "talks", label: "달램 토크", href: "/talks" },
  { id: "mypage", label: "마이페이지", href: "/mypage" },
];
