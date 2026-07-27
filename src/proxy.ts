import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// 로그인이 필수로 요구되는 경로들
const REQUIRED_AUTH_PATHS = ['/mypage'];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isRequiredAuth = REQUIRED_AUTH_PATHS.some((p) =>
    pathname.startsWith(p),
  );

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. 리프레시 토큰조차 없으면 (로그인 안 한 상태)
  if (!refreshToken) {
    return isRequiredAuth ? redirectToLogin(request) : NextResponse.next();
  }

  // 2. 토큰 유효성(만료 시간) 검사
  const isAccessTokenValid = accessToken ? isTokenValid(accessToken) : false;
  const isRefreshTokenValid = isTokenValid(refreshToken);

  // 3. 리프레시 토큰 만료 시
  if (!isRefreshTokenValid) {
    return isRequiredAuth ? redirectToLogin(request) : NextResponse.next();
  }

  // 4. 엑세스 토큰 만료 시 (리프레시는 유효) -> 갱신 시도
  if (!isAccessTokenValid) {
    const refreshedResponse = await refreshTokens(request, refreshToken);
    console.log(refreshedResponse);
    if (refreshedResponse) {
      return refreshedResponse;
    }
    // 백엔드 통신 실패 등 갱신 실패 시
    return isRequiredAuth ? redirectToLogin(request) : NextResponse.next();
  }

  // 5. 모두 유효하면 그대로 통과
  return NextResponse.next();
}

export const config = {
  // 정적 리소스(_next, 이미지 등)를 제외한 모든 라우트에서 프록시 실행
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

/**
 * 토큰의 만료 시간을 검사합니다.
 * @returns 만료 1분 전 이상 남아있으면 true, 그 외엔 false
 */
function isTokenValid(token: string) {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    // exp는 초 단위이므로 1000을 곱해 밀리초로 변환
    return exp * 1000 > Date.now() + 60000;
  } catch {
    return false;
  }
}

import { BACKEND_URL, TEAM_ID } from '@/constants/api';

/**
 * 백엔드에 리프레시 토큰을 보내 새로운 토큰들을 받아오고 쿠키를 구워줍니다.
 */
async function refreshTokens(request: NextRequest, refreshToken: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/${TEAM_ID}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    console.log(res);

    if (!res.ok) return null;

    const data = await res.json();
    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken; // 백엔드 로테이션 여부에 따라 null일 수 있음

    // 1. Next.js 서버 컴포넌트(RSC)로 넘어갈 request 쿠키도 최신화
    request.cookies.set('accessToken', newAccessToken);
    if (newRefreshToken) {
      request.cookies.set('refreshToken', newRefreshToken);
    }

    // 2. 최신화된 request 쿠키를 기반으로 request.headers 쿠키 문자열 재구성
    const newCookieHeader = request.cookies
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    request.headers.set('cookie', newCookieHeader);

    // 3. 헤더가 업데이트된 리퀘스트를 넘겨줌
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // 4. 브라우저로 내려갈 응답(Set-Cookie) 세팅
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    if (newRefreshToken) {
      response.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    return response;
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/sign-in', request.url);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}
