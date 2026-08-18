import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CommentItem } from '../comment-item';
import { AuthProvider } from '@/providers/auth-provider';
import { Comment, User } from '@/api/data-contracts';
import { createMockUser } from '@/__mocks__/fixtures';

const mockUpdateComment = vi.fn();
const mockDeleteComment = vi.fn();
const mockToggleCommentLike = vi.fn();

vi.mock('../../../hooks/use-update-comment', () => ({
  useUpdateComment: (_postId: number, _commentId: number, onSuccess?: () => void) => ({
    updateComment: (content: string) => {
      mockUpdateComment(content);
      onSuccess?.();
    },
    isUpdating: false,
  }),
}));

vi.mock('../../../hooks/use-delete-comment', () => ({
  useDeleteComment: () => ({
    deleteComment: mockDeleteComment,
    isDeleting: false,
  }),
}));

vi.mock('../../../hooks/use-toggle-comment-like', () => ({
  useToggleCommentLike: () => ({
    toggleCommentLike: mockToggleCommentLike,
    isLiking: false,
  }),
}));

const mockComment: Comment = {
  id: 10,
  postId: 100,
  teamId: 'team1',
  authorId: 1,
  author: {
    id: 1,
    name: '작성자 홍길동',
    image: null,
  },
  content: '테스트 댓글 본문입니다.',
  likeCount: 4,
  isLiked: false,
  createdAt: '2026-08-17T00:00:00.000Z',
  updatedAt: '2026-08-17T00:00:00.000Z',
};

function renderWithAuth(ui: React.ReactElement, initialUser: User | null = null) {
  return render(<AuthProvider initialUser={initialUser}>{ui}</AuthProvider>);
}

describe('CommentItem 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('댓글 작성자 정보와 내용, 좋아요 수가 올바르게 렌더링된다', () => {
    renderWithAuth(<CommentItem postId={100} comment={mockComment} />, null);

    expect(screen.getByText('작성자 홍길동')).toBeInTheDocument();
    expect(screen.getByText('테스트 댓글 본문입니다.')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('타인의 댓글일 경우 수정/삭제 메뉴 버튼이 노출되지 않는다', () => {
    const otherUser = createMockUser({ id: 999, name: '다른 유저' });
    renderWithAuth(<CommentItem postId={100} comment={mockComment} />, otherUser);

    expect(screen.queryByLabelText('댓글 메뉴')).not.toBeInTheDocument();
  });

  it('본인의 댓글일 경우 수정/삭제 메뉴 버튼이 노출되고, 수정 클릭 시 폼으로 전환된다', async () => {
    const user = userEvent.setup();
    const authorUser = createMockUser({ id: 1, name: '작성자 홍길동' });

    renderWithAuth(<CommentItem postId={100} comment={mockComment} />, authorUser);

    const menuBtn = screen.getByLabelText('댓글 메뉴');
    expect(menuBtn).toBeInTheDocument();
    await user.click(menuBtn);

    const editOption = screen.getByRole('button', { name: '수정' });
    await user.click(editOption);

    // 수정 입력 폼 렌더링 확인
    const input = screen.getByDisplayValue('테스트 댓글 본문입니다.');
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, '수정된 댓글 내용');

    const saveBtn = screen.getByRole('button', { name: '저장' });
    await user.click(saveBtn);

    expect(mockUpdateComment).toHaveBeenCalledWith('수정된 댓글 내용');
  });

  it('삭제 메뉴 클릭 시 삭제 모달이 열리고, 확인 시 deleteComment가 호출된다', async () => {
    const user = userEvent.setup();
    const authorUser = createMockUser({ id: 1, name: '작성자 홍길동' });

    renderWithAuth(<CommentItem postId={100} comment={mockComment} />, authorUser);

    await user.click(screen.getByLabelText('댓글 메뉴'));
    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(screen.getByText('댓글 삭제')).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: '삭제' });
    await user.click(confirmBtn);

    expect(mockDeleteComment).toHaveBeenCalled();
  });

  it('좋아요 버튼 클릭 시 toggleCommentLike가 현재 isLiked 상태와 함께 호출된다', async () => {
    const user = userEvent.setup();

    renderWithAuth(<CommentItem postId={100} comment={mockComment} />, null);

    const likeBtn = screen.getByText('4').closest('button');
    expect(likeBtn).toBeInTheDocument();
    await user.click(likeBtn!);

    expect(mockToggleCommentLike).toHaveBeenCalledWith(false);
  });
});
