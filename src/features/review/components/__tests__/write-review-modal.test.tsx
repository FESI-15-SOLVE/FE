import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WriteReviewModal } from '../write-review-modal';

const { mockCreateMutate } = vi.hoisted(() => ({
  mockCreateMutate: vi.fn(),
}));

vi.mock('../../hooks/use-create-review-mutation', () => ({
  useCreateReviewMutation: () => ({
    mutateAsync: mockCreateMutate,
    isPending: false,
  }),
}));

vi.mock('../../hooks/use-update-review-mutation', () => ({
  useUpdateReviewMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

function renderWithClient(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe('WriteReviewModal 컴포넌트', () => {
  it('isOpen이 true일 때 리뷰 쓰기 타이틀과 폼 요소들이 노출된다', () => {
    renderWithClient(<WriteReviewModal isOpen={true} meetingId={10} onClose={vi.fn()} />);
    expect(screen.getByText('리뷰 쓰기')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('리뷰 내용이 10자 미만이면 에러 메시지가 표시되고 제출되지 않는다', async () => {
    renderWithClient(<WriteReviewModal isOpen={true} meetingId={10} onClose={vi.fn()} />);
    const textarea = screen.getByRole('textbox');
    const submitBtn = screen.getByRole('button', { name: '확인' });

    await userEvent.type(textarea, '짧은글');
    await userEvent.click(submitBtn);

    expect(await screen.findByText('최소 10자 이상 작성해주세요.')).toBeInTheDocument();
    expect(mockCreateMutate).not.toHaveBeenCalled();
  });
});
