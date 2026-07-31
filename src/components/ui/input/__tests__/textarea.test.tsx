import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from '../textarea';
import { TextAreaField } from '../textarea-field';

describe('TextArea 컴포넌트', () => {
  it('정상적으로 렌더링되며 텍스트 타이핑이 가능하다', async () => {
    render(<TextArea placeholder="Enter description" />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toBeInTheDocument();
    
    await userEvent.type(textarea, 'Hello world');
    expect(textarea).toHaveValue('Hello world');
  });

  it('포커스되었을 때 focus 스타일 클래스가 적용된다', async () => {
    render(<TextArea placeholder="Enter description" />);
    const textarea = screen.getByPlaceholderText('Enter description');
    await userEvent.click(textarea);
    expect(textarea).toHaveClass('focus:border-brand-500');
  });

  it('destructive prop이 true일 때 destructive 스타일 클래스가 적용된다', () => {
    render(<TextArea placeholder="Enter description" destructive />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toHaveClass('border-error-500');
  });

  it('기본 스타일과 커스텀 className이 정상적으로 병합된다', () => {
    render(<TextArea placeholder="Enter description" className="custom-class" />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toHaveClass('custom-class');
  });

  it('disabled prop이 true일 때 비활성화된다', () => {
    render(<TextArea placeholder="Enter description" disabled />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toBeDisabled();
  });
});

describe('TextAreaField 컴포넌트', () => {
  it('label과 required prop이 주어지면 별표(*)와 함께 라벨이 렌더링되며 textarea와 연결된다', () => {
    render(<TextAreaField label="Description" required />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByLabelText('Description', { exact: false })).toBeInTheDocument();
  });

  it('helperText가 렌더링되고 destructive 상태에 따라 알맞은 색상이 적용된다', () => {
    const { rerender } = render(<TextAreaField helperText="Write something" />);
    expect(screen.getByText('Write something')).toHaveClass('text-neutral-400');

    rerender(<TextAreaField helperText="Write something" destructive />);
    expect(screen.getByText('Write something')).toHaveClass('text-error-500');
  });
});
