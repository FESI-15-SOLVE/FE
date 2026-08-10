'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { CustomImage } from './custom-image-extension';
import { TiptapToolbar } from './tiptap-toolbar';
import { useS3ImageUpload } from '../../hooks/use-s3-image-upload';

export interface TiptapEditorProps {
  content?: string;
  onEditorReady?: (editor: Editor | null) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content = '',
  onEditorReady,
  placeholder = '본문 내용을 입력해주세요',
}: TiptapEditorProps) {
  // 1. 에디터 훅 선언 (immediatelyRender: false 필수!)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Markdown,
      CustomImage,
    ],
    content,
    immediatelyRender: false, // SSR 하이드레이션 미스매치 방지 — 필수!
  });

  const { uploadImage } = useS3ImageUpload(editor);

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  // 이미지 드래그 앤 드롭 및 붙여넣기 이벤트 가로채기
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          uploadImage(file);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        e.preventDefault();
        uploadImage(files[i]);
      }
    }
  };

  const editorText = editor?.getText() ?? '';
  const totalLengthWithSpace = editorText.length;
  const totalLengthNoSpace = editorText.replace(/\s/g, '').length;

  return (
    <div
      className="flex flex-col flex-1 w-full bg-white rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-xs"
      onPaste={handlePaste}
      onDrop={handleDrop}
    >
      {/* 툴바 */}
      <TiptapToolbar
        editor={editor}
        onImageSelect={(file) => uploadImage(file)}
      />

      {/* 에디터 본문 영역 */}
      <div className="flex-1 w-full min-h-115 py-6 px-2 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-slate max-w-none min-h-105 focus:outline-none text-[16px] leading-[24px] text-slate-800 tracking-[-0.32px] [&_.is-editor-empty]:before:text-slate-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none"
        />
      </div>

      {/* 글자수 카운터 바 */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-start text-xs sm:text-sm text-slate-400 font-medium tracking-[-0.28px]">
        <span>
          공백포함 : 총 {totalLengthWithSpace}자 | 공백제외 : 총 {totalLengthNoSpace}자
        </span>
      </div>
    </div>
  );
}
