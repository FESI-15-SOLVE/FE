import { describe, it, expect } from 'vitest';
import { createAuthStore } from '../use-auth-store';
import { createMockUser } from '@/__mocks__/fixtures';

describe('createAuthStore', () => {
  const mockUser = createMockUser({ id: 1, email: 'test@example.com', name: '테스터' });

  it('기본 초기값은 user null, isLoggedIn false 여야 한다', () => {
    const store = createAuthStore();
    const state = store.getState();
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('initialUser 전달 시 user 및 isLoggedIn 상태가 세팅되어야 한다', () => {
    const store = createAuthStore(mockUser);
    const state = store.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });

  it('setAuth 호출 시 user 및 isLoggedIn 상태가 변경되어야 한다', () => {
    const store = createAuthStore();
    store.getState().setAuth(mockUser);
    expect(store.getState().user).toEqual(mockUser);
    expect(store.getState().isLoggedIn).toBe(true);

    store.getState().setAuth(null);
    expect(store.getState().user).toBeNull();
    expect(store.getState().isLoggedIn).toBe(false);
  });

  it('clearAuth 호출 시 유저 정보 및 로그인 상태가 리셋되어야 한다', () => {
    const store = createAuthStore(mockUser);
    store.getState().clearAuth();
    expect(store.getState().user).toBeNull();
    expect(store.getState().isLoggedIn).toBe(false);
  });
});
