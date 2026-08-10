'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from '@tiptap/markdown';
import { FileHandler } from '@tiptap/extension-file-handler';
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension';
import { TiptapToolbar } from './tiptap-toolbar';
import { getPresignedUrlAction } from '@/actions/image/image-actions';
import { unwrapAction } from '@/lib/safe-action';
import axios from 'axios';

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
      ImageUploadNode.configure({
        accept: 'image/png, image/jpeg, image/webp, image/gif',
        maxSize: 10 * 1024 * 1024, // 10MB
        limit: 3,
        upload: async (file, onProgress, abortSignal) => {
          const { presignedUrl, publicUrl } = unwrapAction(
            await getPresignedUrlAction({
              fileName: file.name,
              contentType: file.type as any,
              folder: 'posts',
            }),
          );

          await axios.put(presignedUrl, file, {
            headers: { 'Content-Type': file.type },
            signal: abortSignal,
            onUploadProgress: (e) => {
              if (e.total) {
                onProgress?.({
                  progress: Math.round((e.loaded * 100) / e.total),
                });
              }
            },
          });

          return publicUrl;
        },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          if (files.length > 0) {
            currentEditor
              .chain()
              .focus()
              .setImageUploadNode({ files }, pos)
              .run();
          }
        },
        onPaste: (currentEditor, files) => {
          if (files.length > 0) {
            currentEditor
              .chain()
              .focus()
              .setImageUploadNode({ files })
              .run();
          }
        },
      }),
    ],
    content,
    immediatelyRender: false, // SSR 하이드레이션 미스매치 방지 — 필수!
  });

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  const editorText = editor?.getText() ?? '';
  const totalLengthWithSpace = editorText.length;
  const totalLengthNoSpace = editorText.replace(/\s/g, '').length;

  return (
    <div className="flex flex-col flex-1 w-full bg-white rounded-[40px] p-6 sm:p-10 border border-slate-100 shadow-xs">
      {/* 툴바 */}
      <TiptapToolbar editor={editor} />

      {/* 에디터 본문 영역 (부모 높이 100% 장악 + 클릭 시 자동 포커스) */}
      <div
        className="flex-1 flex flex-col w-full min-h-[320px] sm:min-h-[460px] py-4 sm:py-6 px-2 overflow-y-auto cursor-text"
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="prose prose-slate max-w-none flex-1 flex flex-col focus:outline-none [&_.ProseMirror]:flex-1 [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:ring-0 [&_.ProseMirror]:border-none text-[16px] leading-[24px] text-slate-800 tracking-[-0.32px] [&_.is-editor-empty]:before:text-slate-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:h-0 [&_.is-editor-empty]:before:pointer-events-none"
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
