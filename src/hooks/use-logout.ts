'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/auth/auth-actions';
import { unwrapAction } from '@/lib/safe-action';
import { useAuthStore } from '@/providers/auth-provider';
import { ROUTES } from '@/constants/routes';

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [, startTransition] = useTransition();

  const logout = async () => {
    try {
      unwrapAction(await logoutAction());
    } finally {
      // clearAuth + push를 transition으로 묶어 GNB 상태 변경과 페이지 전환이 동시에 commit되도록 함
      startTransition(() => {
        clearAuth();
        router.push(ROUTES.AUTH.SIGN_IN);
      });
    }
  };

  return { logout };
}
