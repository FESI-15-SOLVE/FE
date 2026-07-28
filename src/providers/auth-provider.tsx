'use client';

import { createContext, useContext, useState } from 'react';
import { useStore, type StoreApi } from 'zustand';
import { createAuthStore, type AuthState } from '@/store/use-auth-store';
import { User } from '@/api/data-contracts';

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

interface AuthProviderProps {
  initialUser: User | null;
  children: React.ReactNode;
}

export function AuthProvider({ initialUser, children }: AuthProviderProps) {
  // useState의 초기값 함수(Lazy initialization)를 사용하면 
  // 렌더링 중 ref를 직접 수정/접근하는 문제를 피할 수 있으며, 인스턴스 1회 생성도 보장됩니다.
  const [store] = useState(() => createAuthStore(initialUser));

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error('AuthProvider 밖에서 useAuthStore 호출됨');
  return useStore(store, selector);
}
