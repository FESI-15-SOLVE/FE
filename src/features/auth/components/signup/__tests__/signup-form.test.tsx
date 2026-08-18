import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignupForm } from '../signup-form';
import { signupAction } from '@/actions/auth/auth-actions';
import { createMockUser } from '@/__mocks__/fixtures';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/actions/auth/auth-actions', () => ({
  signupAction: vi.fn(),
}));

const mockUser = createMockUser({ name: '홍길동' });

describe('SignupForm 행위 및 통합 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('기본 UI 입력창과 확인 버튼을 올바르게 렌더링한다', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/이름/)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 *')).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호 확인/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('잘못된 이메일 형식이나 비밀번호 불일치 시 유효성 에러 메시지를 표시하고 제출 버튼을 비활성화한다', async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    const emailInput = screen.getByLabelText(/이메일/);
    const passwordInput = screen.getByLabelText('비밀번호 *');
    const passwordConfirmInput = screen.getByLabelText(/비밀번호 확인/);
    const submitButton = screen.getByRole('button', { name: '확인' });

    await user.type(emailInput, 'invalid-email');
    expect(
      await screen.findByText('유효한 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument();

    // 2. 비밀번호 불일치 입력
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'password456');
    expect(
      await screen.findByText('비밀번호가 일치하지 않습니다.'),
    ).toBeInTheDocument();

    // 3. 폼이 미완성이거나 유효하지 않으므로 확인 버튼은 disabled 상태
    expect(submitButton).toBeDisabled();
  });

  it('올바른 양식을 입력하고 제출 시 signupAction이 호출되고 /sign-in 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    vi.mocked(signupAction).mockResolvedValueOnce({
      data: mockUser,
    });

    render(<SignupForm />);

    await user.type(screen.getByLabelText(/이름/), '홍길동');
    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    // 비밀번호 확인과의 명확한 구분을 위해 exact match
    await user.type(screen.getByLabelText('비밀번호 *'), 'password123');
    await user.type(screen.getByLabelText(/비밀번호 확인/), 'password123');

    const submitButton = screen.getByRole('button', { name: '확인' });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    expect(signupAction).toHaveBeenCalledWith({
      name: '홍길동',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(mockPush).toHaveBeenCalledWith('/sign-in');
  });

  it('서버 에러 응답 수신 시 폼 하단에 root 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    vi.mocked(signupAction).mockResolvedValueOnce({
      serverError: {
        message: '이미 가입된 이메일입니다.',
        code: 'EMAIL_EXISTS',
        status: 400,
      },
    });

    render(<SignupForm />);

    await user.type(screen.getByLabelText(/이름/), '홍길동');
    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    // 비밀번호 확인과의 명확한 구분을 위해 exact match
    await user.type(screen.getByLabelText('비밀번호 *'), 'password123');
    await user.type(screen.getByLabelText(/비밀번호 확인/), 'password123');

    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(
      await screen.findByText('이미 가입된 이메일입니다.'),
    ).toBeInTheDocument();
  });
});
