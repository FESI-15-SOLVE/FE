import { render, screen } from '@testing-library/react';
import { SignupForm } from '../signup-form';

describe('SignupForm', () => {
  it('renders correctly', () => {
    render(<SignupForm />);
    expect(
      screen.getByPlaceholderText('이름을 입력해 주세요'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('이메일을 입력해 주세요'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('비밀번호를 입력해 주세요'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('비밀번호를 다시 한 번 입력해 주세요'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });
});
