import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuthAction } from '../use-auth-action';

const mockOpenAlert = vi.fn();
const mockUser = { id: null as number | null };

vi.mock('@/providers/auth-provider', () => ({
  useAuthStore: (
    selector: (state: { user: { id: number | null } | null }) => {
      user: { id: number | null } | null;
    },
  ) => selector({ user: mockUser.id ? { id: mockUser.id } : null }),
}));

vi.mock('@/hooks/use-login-alert', () => ({
  useLoginAlert: () => ({ openAlert: mockOpenAlert }),
}));

beforeEach(() => {
  mockOpenAlert.mockClear();
});

describe('useAuthAction', () => {
  it('비로그인 상태일 때 action 호출 시 openAlert를 열고 action 실행을 중단해야 한다', () => {
    mockUser.id = null;
    const actionSpy = vi.fn();
    const { result } = renderHook(() => useAuthAction());

    const protectedAction = result.current(actionSpy);
    protectedAction();

    expect(mockOpenAlert).toHaveBeenCalled();
    expect(actionSpy).not.toHaveBeenCalled();
  });

  it('로그인 상태일 때 action 호출 시 원래 action이 정상 실행되어야 한다', () => {
    mockUser.id = 1;
    const actionSpy = vi.fn().mockReturnValue('success');
    const { result } = renderHook(() => useAuthAction());

    const protectedAction = result.current(actionSpy);
    const returnVal = protectedAction();

    expect(mockOpenAlert).not.toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalled();
    expect(returnVal).toBe('success');
  });
});
