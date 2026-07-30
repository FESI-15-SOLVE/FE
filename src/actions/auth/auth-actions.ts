'use server';

import { z } from 'zod';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { cookies } from 'next/headers';
import { LoginRequest, SignupRequest } from '@/api/data-contracts';
import { actionClient } from '@/lib/safe-action';

export const loginAction = actionClient
  .inputSchema(z.custom<LoginRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.auth.login({ teamId: TEAM_ID }, data);
    const { accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    return response.data;
  });

export const signupAction = actionClient
  .inputSchema(z.custom<SignupRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.auth.signup({ teamId: TEAM_ID }, data);
    return response.data;
  });

export const getMyProfileAction = actionClient.action(async () => {
  try {
    const response = await ServerApi.users.getMyProfile({ teamId: TEAM_ID });
    return response.data;
  } catch {
    // 401 Unauthorized 등 에러 발생 시 예외를 삼키고 null 반환
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
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  }

  return { success: true };
});
