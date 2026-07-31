import 'server-only';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export interface AuthTokensInput {
  accessToken?: string | null;
  refreshToken?: string | null;
}

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

// accessToken 만료 시간: 15분 (900초)
export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 15 * 60,
};

// refreshToken 만료 시간: 15일 (1,296,000초)
export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 15 * 24 * 60 * 60,
};

type CookieTarget = ResponseCookies | ReadonlyRequestCookies;

/**
 * 서비스 인증 토큰 쿠키(accessToken: 15분, refreshToken: 15일)를 일관되게 세팅합니다.
 */
export function setAuthCookies(
  cookiesTarget: CookieTarget,
  tokens: AuthTokensInput,
) {
  if (tokens.accessToken) {
    cookiesTarget.set('accessToken', tokens.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
  }
  if (tokens.refreshToken) {
    cookiesTarget.set('refreshToken', tokens.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  }
}

/**
 * 서비스 인증 토큰 쿠키(accessToken, refreshToken)를 파기합니다.
 */
export function clearAuthCookies(cookiesTarget: CookieTarget) {
  cookiesTarget.delete('accessToken');
  cookiesTarget.delete('refreshToken');
}
