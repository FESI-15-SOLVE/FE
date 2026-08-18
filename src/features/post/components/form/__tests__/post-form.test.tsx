import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { PostForm } from '../post-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMockPost } from '@/__mocks__/fixtures';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockCreatePostAction = vi.fn().mockResolvedValue({ data: { id: 701 } });
const mockUpdatePostAction = vi.fn().mockResolvedValue({ data: { id: 701 } });

vi.mock('@/actions/post/post-actions', () => ({
  createPostAction: (params: unknown) => mockCreatePostAction(params),
  updatePostAction: (params: unknown) => mockUpdatePostAction(params),
}));

vi.mock('@/lib/safe-action', async (importOriginal) => {
  return await importOriginal();
});

// TiptapEditor 모킹: 마운트 시 1회만 editor 및 내용 초기화 (무한 리렌더 루프 방지)
vi.mock('../../editor/tiptap-editor', () => ({
  TiptapEditor: ({
    onEditorReady,
    onUpdate,
  }: {
    onEditorReady: (editor: unknown) => void;
    onUpdate: (editor: { getText: () => string; getJSON: () => unknown; markdown: { serialize: () => string } }) => void;
  }) => {
    React.useEffect(() => {
      const fakeEditor = {
        getText: () => '가짜 본문 내용',
        getJSON: () => ({ type: 'doc', content: [] }),
        markdown: {
          serialize: () => '가짜 본문 마크다운',
        },
        commands: {
          setContent: vi.fn(),
        },
      };
      onEditorReady(fakeEditor);
      onUpdate(fakeEditor);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div data-testid="mock-tiptap-editor">Tiptap Editor</div>;
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('PostForm 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('기본 UI 요소(제목 입력창, 글자수 카운터, 등록 버튼)가 올바르게 렌더링된다', () => {
    render(<PostForm mode="create" />, { wrapper: createWrapper() });

    expect(screen.getByPlaceholderText('제목을 입력해주세요')).toBeInTheDocument();
    expect(screen.getByText('0/')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '등록' })).toBeInTheDocument();
  });

  it('제목 입력 시 실시간 글자수 카운터가 업데이트된다', async () => {
    const user = userEvent.setup();
    render(<PostForm mode="create" />, { wrapper: createWrapper() });

    const titleInput = screen.getByPlaceholderText('제목을 입력해주세요');
    await user.type(titleInput, '안녕하세요');

    expect(screen.getByText('5/')).toBeInTheDocument();
  });

  it('제목과 본문이 입력되면 등록 버튼이 활성화되고 제출 시 createPostAction이 호출된다', async () => {
    const user = userEvent.setup();
    render(<PostForm mode="create" />, { wrapper: createWrapper() });

    const titleInput = screen.getByPlaceholderText('제목을 입력해주세요');
    await user.type(titleInput, '새 게시글 제목');

    const submitBtn = screen.getByRole('button', { name: '등록' });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockCreatePostAction).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '새 게시글 제목',
          content: '가짜 본문 마크다운',
        }),
      );
    });
    expect(mockPush).toHaveBeenCalledWith('/talk/701');
  });

  it('mode가 "edit"일 때 initialData 내용이 채워지고 제출 시 updatePostAction이 호출된다', async () => {
    const user = userEvent.setup();
    const initialData = createMockPost({
      id: 701,
      title: '수정할 게시글 제목',
      content: '기존 본문 내용',
    });

    render(<PostForm mode="edit" postId={701} initialData={initialData} />, {
      wrapper: createWrapper(),
    });

    const titleInput = screen.getByPlaceholderText('제목을 입력해주세요') as HTMLInputElement;
    expect(titleInput.value).toBe('수정할 게시글 제목');

    const submitBtn = screen.getByRole('button', { name: '수정' });
    await waitFor(() => expect(submitBtn).toBeEnabled());

    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdatePostAction).toHaveBeenCalledWith(
        expect.objectContaining({
          postId: 701,
          title: '수정할 게시글 제목',
        }),
      );
    });
  });
});
