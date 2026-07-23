import { render, screen } from '@testing-library/react';
import { SignupForm } from '../signup-form';

describe('SignupForm', () => {
  it('renders correctly', () => {
    render(<SignupForm />);
    expect(screen.getByRole('heading', { name: '회원가입' })).toBeInTheDocument();
    expect(screen.getByLabelText('이름')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
  });
});
