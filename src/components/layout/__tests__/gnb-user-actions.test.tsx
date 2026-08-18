import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { GnbUserActions } from '../gnb-user-actions';
import { AuthProvider } from '@/providers/auth-provider';
import { createMockUser } from '@/__mocks__/fixtures';
import { ROUTES } from '@/constants/routes';
import { User } from '@/api/data-contracts';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockLogoutAction = vi.fn().mockResolvedValue({ data: {} });
vi.mock('@/actions/auth/auth-actions', () => ({
  logoutAction: () => mockLogoutAction(),
}));

vi.mock('@/features/notification/components/notification-bell', () => ({
  NotificationBell: () => <div data-testid="notification-bell">알림벨</div>,
}));

vi.mock('../mobile-menu-sheet', () => ({
  MobileMenuSheet: () => <div data-testid="mobile-menu-sheet">모바일메뉴</div>,
}));

function renderWithAuth(ui: React.ReactElement, initialUser: User | null = null) {
  return render(<AuthProvider initialUser={initialUser}>{ui}</AuthProvider>);
}

describe('GnbUserActions 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('비로그인 상태일 때 로그인 버튼이 노출되고 알림벨 및 프로필 버튼은 노출되지 않는다', () => {
    renderWithAuth(<GnbUserActions />, null);

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.closest('a')).toHaveAttribute('href', ROUTES.AUTH.SIGN_IN);
    expect(screen.queryByTestId('notification-bell')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '로그아웃' })).not.toBeInTheDocument();
  });

  it('로그인 상태일 때 알림벨, 프로필 버튼, 로그아웃 버튼이 렌더링된다', () => {
    const mockUser = createMockUser({ id: 10, name: '테스트유저' });
    renderWithAuth(<GnbUserActions />, mockUser);

    expect(screen.getByTestId('notification-bell')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
  });

  it('로그아웃 버튼 클릭 시 logoutAction이 호출되고 로그인 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    const mockUser = createMockUser({ id: 10, name: '테스트유저' });
    renderWithAuth(<GnbUserActions />, mockUser);

    const logoutBtn = screen.getByRole('button', { name: '로그아웃' });
    await user.click(logoutBtn);

    await waitFor(() => expect(mockLogoutAction).toHaveBeenCalled());
    expect(mockPush).toHaveBeenCalledWith(ROUTES.AUTH.SIGN_IN);
  });
});
