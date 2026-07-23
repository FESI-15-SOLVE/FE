import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, InputField } from '../index';

describe('Input 컴포넌트', () => {
  it('placeholder와 함께 정상적으로 렌더링된다', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('포커스되었을 때 focus 스타일 클래스가 적용된다', async () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    await userEvent.click(input);
    expect(input).toHaveClass('focus:border-brand-500');
  });

  it('destructive prop이 true일 때 destructive 스타일 클래스가 적용된다', () => {
    render(<Input placeholder="Enter text" destructive />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('border-danger-500');
  });

  it('기본 스타일과 커스텀 className이 정상적으로 병합된다', () => {
    render(<Input placeholder="Enter text" className="custom-class" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('custom-class');
  });

  it('disabled prop이 true일 때 비활성화된다', () => {
    render(<Input placeholder="Enter text" disabled />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeDisabled();
  });
});

describe('InputField 컴포넌트', () => {
  it('label과 required prop이 주어지면 별표(*)와 함께 라벨이 렌더링되며 input과 연결된다', () => {
    render(<InputField label="Username" required />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByLabelText('Username', { exact: false })).toBeInTheDocument();
  });

  it('helperText가 렌더링되고 기본적으로 neutral 색상이 적용된다', () => {
    render(<InputField helperText="Enter your email" />);
    const helper = screen.getByText('Enter your email');
    expect(helper).toHaveClass('text-neutral-400');
  });

  it('destructive가 true일 때 helperText에 danger 색상이 적용된다', () => {
    render(<InputField helperText="Invalid email" destructive />);
    const helper = screen.getByText('Invalid email');
    expect(helper).toHaveClass('text-danger-500');
  });
});
