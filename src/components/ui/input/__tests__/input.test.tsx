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
    expect(input).toHaveClass('border-error-500');
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
  it('label과 required props가 전달되면 렌더링되어야 한다.', () => {
    render(
      <InputField label="Username" required>
        <Input />
      </InputField>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('헬퍼 텍스트(helperText) 또는 에러(error)가 전달되면, 해당 텍스트가 렌더링되어야 한다.', () => {
    render(
      <InputField error="Enter your email">
        <Input />
      </InputField>
    );
    const helper = screen.getByText('Enter your email');
    expect(helper).toBeInTheDocument();
  });

  it('에러 텍스트가 전달되면, 해당 에러 메시지와 올바른 색상(destructive)이 렌더링되어야 한다.', () => {
    render(
      <InputField error="Invalid email">
        <Input />
      </InputField>
    );
    const helper = screen.getByText('Invalid email');
    expect(helper).toHaveClass('text-destructive');
  });
});
