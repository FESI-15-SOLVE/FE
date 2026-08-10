/**
 * 애플리케이션 전체 라우트(URL)의 단일 진실의 원천 (Single Source of Truth).
 * 경로가 변경될 때 이 파일 1곳만 수정하면 전체 프로젝트에 안전하게 100% 자동 반영됩니다.
 */
export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
  MEETINGS: {
    LIST: '/meetings',
    DETAIL: (id: string | number) => `/meetings/${id}`,
  },
  SAVED: '/saved',
  REVIEWS: '/reviews',
  TALK: {
    LIST: '/talk',
    CREATE: '/talk/create',
    DETAIL: (id: string | number) => `/talk/${id}`,
  },
  MY_PAGE: {
    ROOT: '/mypage',
    INDEX: '/mypage',
    JOINED: '/mypage?tab=joined',
    REVIEWS: '/mypage?tab=reviews',
    CREATED: '/mypage?tab=created',
  },
} as const;
