import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CommentInputForm } from '../comment-input-form';
import { AuthState } from '@/store/use-auth-store';
import { createMockUser } from '@/__mocks__/fixtures';

const { mockCreateComment } = vi.hoisted(() => ({
  mockCreateComment: vi.fn(),
}));

vi.mock('../../../hooks/use-create-comment', () => ({
  useCreateComment: () => ({
    createComment: mockCreateComment,
    isCreating: false,
  }),
}));

const mockUser = createMockUser({ name: '테스터' });

const mockAuthState: AuthState = {
  user: mockUser,
  isLoggedIn: true,
  setAuth: vi.fn(),
  clearAuth: vi.fn(),
};

vi.mock('@/providers/auth-provider', () => ({
  useAuthStore: <T,>(selector: (state: AuthState) => T): T =>
    selector(mockAuthState),
}));

function renderWithClient(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe('CommentInputForm 컴포넌트', () => {
  it('초기 상태에서는 댓글 등록 버튼이 비활성화되어 있다', () => {
    renderWithClient(<CommentInputForm postId={100} />);
    const button = screen.getByRole('button', { name: '등록' });
    expect(button).toBeDisabled();
  });

  it('댓글 내용을 입력하면 등록 버튼이 활성화되고 제출 시 createComment가 호출된다', async () => {
    renderWithClient(<CommentInputForm postId={100} />);
    const input = screen.getByPlaceholderText('여기에 댓글을 남겨보세요');
    const button = screen.getByRole('button', { name: '등록' });

    await userEvent.type(input, '좋은 게시글입니다!');
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(mockCreateComment).toHaveBeenCalledWith('좋은 게시글입니다!');
  });
});
