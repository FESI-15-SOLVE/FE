'use server';

import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { cookies } from 'next/headers';
import { LoginRequest, SignupRequest } from '@/api/data-contracts';

export async function loginAction(data: LoginRequest) {
  try {
    const response = await ServerApi.auth.login({ teamId: TEAM_ID }, data);
    const { accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();
    // 백엔드 응답에서 토큰을 추출해 쿠키에 구움
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

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }

    return { success: false, message: '알수 없는 에러' };
  }
}

export async function signupAction(data: SignupRequest) {
  try {
    await ServerApi.auth.signup({ teamId: TEAM_ID }, data);
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }

    return { success: false, message: '알수 없는 에러' };
  }
}
