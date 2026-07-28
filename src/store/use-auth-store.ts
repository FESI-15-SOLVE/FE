import { createStore } from 'zustand/vanilla';
import { User } from '@/api/data-contracts';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (user: User | null) => void;
  clearAuth: () => void;
}

export const createAuthStore = (initialUser: User | null = null) =>
  createStore<AuthState>((set) => ({
    user: initialUser,
    isLoggedIn: Boolean(initialUser),
    setAuth: (user) => set({ user, isLoggedIn: Boolean(user) }),
    clearAuth: () => set({ user: null, isLoggedIn: false }),
  }));
