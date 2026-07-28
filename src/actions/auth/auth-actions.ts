'use server';

import { z } from 'zod';
import { ServerApi } from '@/api';
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
