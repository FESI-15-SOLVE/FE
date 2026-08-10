'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tiptap/react';
import { toast } from 'sonner';
import { createPostAction } from '@/actions/post/post-actions';
import { unwrapAction } from '@/lib/safe-action';
import { TiptapEditor } from './editor/tiptap-editor';
import { extractFirstImageFromAST } from '../utils/extract-first-image';
import { Button } from '@/components/ui/button';
import { ErrorResponse } from '@/lib/error-response';

export function PostCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleLength = title.length;
  const isTitleValid = titleLength > 0 && titleLength <= 30;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (titleLength > 30) {
      toast.error('제목은 30자 이내로 입력해주세요.');
      return;
    }

    if (!editor) return;

    const editorText = editor.getText().trim();
    if (!editorText) {
      toast.error('본문 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Tiptap AST 및 마크다운 직렬화 (공식 @tiptap/markdown)
      if (!editor.markdown) {
        toast.error(
          '에디터 초기화 오류입니다. 페이지 새로고침 후 다시 시도해주세요.',
        );
        return;
      }

      const jsonAST = editor.getJSON();
      const contentMarkdown = editor.markdown.serialize(jsonAST);

      // 2. AST 트리를 순회하여 첫번째 이미지 URL 추출 (정규식 오탐 방지)
      const firstImageUrl = extractFirstImageFromAST(jsonAST);

      // 3. Server Action 호출
      unwrapAction(
        await createPostAction({
          title: title.trim(),
          content: contentMarkdown,
          image: firstImageUrl,
        }),
      );

      toast.success('게시글이 등록되었습니다!');
      router.push('/talk');
    } catch (err) {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '게시글 등록 중 오류가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[860px] mx-auto gap-6 py-8 px-4 sm:px-0"
    >
      {/* Title Bar & Submit Button (Figma Node: 15273:43147) */}
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Title Input Row */}
        <div className="flex-1 flex items-center justify-between border-b border-slate-200 pb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            maxLength={30}
            className="w-full bg-transparent text-xl sm:text-[30px] font-semibold tracking-[-0.6px] text-slate-900 placeholder:text-slate-300 focus:outline-none"
          />
          {/* Character Count */}
          <div className="flex items-center text-sm sm:text-base font-medium tracking-[-0.32px] shrink-0 ml-2 select-none">
            <span className="text-slate-400">{titleLength}/</span>
            <span className="text-[#00bb86]">30</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isTitleValid || isSubmitting}
          className="h-12 px-6 rounded-xl bg-[#00bb86] hover:bg-[#009973] text-white font-semibold text-base transition-colors shrink-0 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </Button>
      </div>

      {/* Main Tiptap Editor Container (Figma Node: 15273:43161) */}
      <div className="w-full min-h-[720px] flex flex-col">
        <TiptapEditor onEditorReady={setEditor} />
      </div>
    </form>
  );
}
