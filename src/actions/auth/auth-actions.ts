'use server';

import { z } from 'zod';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { cookies } from 'next/headers';
import { LoginRequest, SignupRequest } from '@/api/data-contracts';
import { actionClient } from '@/lib/safe-action';
import {
  setAuthCookies,
  clearAuthCookies,
} from '@/features/auth/lib/auth-cookies';
import { ErrorResponse } from '@/lib/error-response';

export const loginAction = actionClient
  .inputSchema(z.custom<LoginRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.auth.login({ teamId: TEAM_ID }, data);

    const cookieStore = await cookies();
    setAuthCookies(cookieStore, response.data);

    return response.data;
  });

export const signupAction = actionClient
  .inputSchema(z.custom<SignupRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.auth.signup({ teamId: TEAM_ID }, data);
    return response.data;
  });


// 루트 레이아웃에서 유저 정보를 주입하기 위해 사용하는 내용인데(클라에서 사용예정 x) 해당 에러로 루트가 멈추는걸 방지하기 위해 null 반환 
export const getMyProfileAction = actionClient.action(async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await ServerApi.users.getMyProfile({ teamId: TEAM_ID });
    return response.data;
  } catch (error) {
    if (error instanceof ErrorResponse && error.status === 401) {
      //제대로 유효한 사용자가 아니기에 (즉 에러로 볼 여지는 없기에 return null 만 한다.)
      return null;
    }
    // 무언가 다른 이유로 서버가 죽으면 서버 콘솔에 로깅하고 반환한다.
    console.error('[getMyProfileAction] 프로필 조회 중 서버 에러 발생:', error);
    return null;
  }
});

export const logoutAction = actionClient.action(async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
      // 백엔드에 로그아웃 요청 (세션 종료)
      await ServerApi.auth.logout({ teamId: TEAM_ID }, { refreshToken });
    }
  } catch {
    // 로그아웃 API 실패(이미 만료됨 등)해도 클라이언트 쿠키는 지워야 함
  } finally {
    const cookieStore = await cookies();
    clearAuthCookies(cookieStore);
  }

  return { success: true };
});
