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
import { uploadImage } from '../../hooks/use-s3-image-upload';

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
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            uploadImage(currentEditor, file, pos);
          });
        },
        onPaste: (currentEditor, files) => {
          files.forEach((file) => {
            uploadImage(currentEditor, file);
          });
        },
      }),
    ],
    content,
    immediatelyRender: false, // SSR 하이드레이션 미스매치 방지 — 필수!
  });

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);
  



  return (
    <div className="flex flex-col flex-1 w-full bg-white rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-xs">
      {/* 툴바 */}
      <TiptapToolbar
        editor={editor}
        onImageSelect={(file) => uploadImage(editor, file)}
      />

      {/* 에디터 본문 영역 */}
      <div className="flex-1 w-full min-h-115 py-6 px-2 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-slate max-w-none min-h-105 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:ring-0 [&_.ProseMirror]:border-none text-[16px] leading-[24px] text-slate-800 tracking-[-0.32px] [&_.is-editor-empty]:before:text-slate-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:h-0 [&_.is-editor-empty]:before:pointer-events-none"
        />
      </div>


    </div>
  );
}
