'use client';

import { useAuthStore } from '@/providers/auth-provider';
import { useLoginAlert } from '@/hooks/use-login-alert';
import { useCallback } from 'react';

/**
 * 로그인이 필요한 액션을 감싸서 반환하는 훅
 * 로그인이 되어있지 않다면 로그인 모달을 띄우고 액션을 중단합니다.
 */
export function useAuthAction() {
  const user = useAuthStore((s) => s.user);
  const { openAlert } = useLoginAlert();

  const withAuth = useCallback(
    <Args extends unknown[], Return>(action: (...args: Args) => Return) => {
      return (...args: Args): Return | void => {
        if (!user?.id) {
          openAlert();
          return;
        }
        return action(...args);
      };
    },
    [user?.id, openAlert],
  );

  return withAuth;
}
