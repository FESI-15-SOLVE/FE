'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { FileHandler } from '@tiptap/extension-file-handler';
import { ImageUploadBlock } from './image-upload-block-extension';
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
  const uploadImageRef = React.useRef<((file: File, pos?: number) => Promise<void>) | null>(null);

  // Tiptap 공식 패키지 기반 에디터 (immediatelyRender: false 필수!)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Markdown,
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      ImageUploadBlock,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (_editor, files, pos) => {
          files.forEach((file) => {
            uploadImageRef.current?.(file, pos);
          });
        },
        onPaste: (_editor, files) => {
          files.forEach((file) => {
            uploadImageRef.current?.(file);
          });
        },
      }),
    ],
    content,
    immediatelyRender: false, // SSR 하이드레이션 미스매치 방지 — 필수!
  });

  const { uploadImage } = useS3ImageUpload(editor);

  useEffect(() => {
    uploadImageRef.current = uploadImage;
  }, [uploadImage]);

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  const editorText = editor?.getText() ?? '';
  const totalLengthWithSpace = editorText.length;
  const totalLengthNoSpace = editorText.replace(/\s/g, '').length;

  return (
    <div className="flex flex-col flex-1 w-full bg-white rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-xs">
      {/* 툴바 */}
      <TiptapToolbar
        editor={editor}
        onImageSelect={(file) => uploadImage(file)}
      />

      {/* 에디터 본문 영역 */}
      <div className="flex-1 w-full min-h-[460px] py-6 px-2 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-slate max-w-none min-h-[420px] focus:outline-none text-[16px] leading-[24px] text-slate-800 tracking-[-0.32px] [&_.is-editor-empty]:before:text-slate-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none"
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
