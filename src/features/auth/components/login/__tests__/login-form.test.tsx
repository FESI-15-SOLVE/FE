import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../login-form';
import { loginAction } from '@/actions/auth/auth-actions';
import { createMockUser } from '@/__mocks__/fixtures';
import { AuthState } from '@/store/use-auth-store';

const mockPush = vi.fn();
const mockSetAuth = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/actions/auth/auth-actions', () => ({
  loginAction: vi.fn(),
}));

vi.mock('@/providers/auth-provider', () => ({
  useAuthStore: <T,>(selector: (state: AuthState) => T): T =>
    selector({
      user: null,
      isLoggedIn: false,
      setAuth: mockSetAuth,
      clearAuth: vi.fn(),
    }),
}));

const mockUser = createMockUser({ name: '홍길동' });

describe('LoginForm 행위 및 통합 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('기본 UI 입력창과 로그인 버튼을 올바르게 렌더링한다', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('잘못된 이메일 형식 입력 시 유효성 에러 메시지를 표시하고 로그인 버튼을 비활성화한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/이메일/);
    const submitButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'invalid-email');
    await user.tab();

    expect(
      await screen.findByText('이메일 형식으로 작성해 주세요.'),
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('8자 미만 비밀번호 입력 시 유효성 에러 메시지를 표시하고 로그인 버튼을 비활성화한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/비밀번호/);
    const submitButton = screen.getByRole('button', { name: '로그인' });

    await user.type(passwordInput, '1234');
    await user.tab();

    expect(
      await screen.findByText('비밀번호는 8자 이상 입력해 주세요.'),
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('올바른 계정 정보 입력 후 제출 시 loginAction 및 setAuth가 호출되고 메인 페이지(/)로 이동한다', async () => {
    const user = userEvent.setup();
    vi.mocked(loginAction).mockResolvedValueOnce({
      data: {
        user: mockUser,
        accessToken: 'fake-jwt-token',
        refreshToken: 'fake-refresh-token',
      },
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    await user.type(screen.getByLabelText(/비밀번호/), 'password123');

    const submitButton = screen.getByRole('button', { name: '로그인' });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    expect(loginAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(mockSetAuth).toHaveBeenCalledWith(mockUser);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('서버 에러 응답 수신 시 폼 하단에 root 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    vi.mocked(loginAction).mockResolvedValueOnce({
      serverError: {
        message: '이메일 또는 비밀번호가 일치하지 않습니다.',
        code: 'INVALID_CREDENTIALS',
        status: 400,
      },
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    await user.type(screen.getByLabelText(/비밀번호/), 'password123');

    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(
      await screen.findByText('이메일 또는 비밀번호가 일치하지 않습니다.'),
    ).toBeInTheDocument();
  });
});
