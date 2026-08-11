'use client';

import React, { useRef } from 'react';
import { Editor, useEditorState } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  List,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TiptapToolbarProps {
  editor: Editor | null;
}

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isLeft: false,
          isCenter: false,
          isBulletList: false,
        };
      }
      return {
        isBold: ctx.editor.isActive('bold'),
        isItalic: ctx.editor.isActive('italic'),
        isUnderline: ctx.editor.isActive('underline'),
        isLeft: ctx.editor.isActive({ textAlign: 'left' }),
        isCenter: ctx.editor.isActive({ textAlign: 'center' }),
        isBulletList: ctx.editor.isActive('bulletList'),
      };
    },
  });

  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      editor
        .chain()
        .focus()
        .setImageUploadNode({ files: Array.from(files) })
        .run();
      e.target.value = '';
    }
  };

  return (
    <div className="bg-slate-50 flex items-center gap-1 sm:gap-1.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-3xl w-full shrink-0 select-none border border-slate-100">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isBold && 'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-5 h-5" />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isItalic && 'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-5 h-5" />
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isUnderline &&
            'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Underline (Ctrl+U)"
      >
        <Underline className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="h-6 w-[1px] bg-slate-200 mx-1 sm:mx-2" />

      {/* Left Align */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isLeft && 'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Align Left"
      >
        <AlignLeft className="w-5 h-5" />
      </button>

      {/* Center Align */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isCenter && 'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Align Center"
      >
        <AlignCenter className="w-5 h-5" />
      </button>

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50',
          activeState?.isBulletList &&
            'text-green-500 bg-green-50 font-semibold hover:bg-green-100/70',
        )}
        title="Bullet List"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="h-6 w-[1px] bg-slate-200 mx-1 sm:mx-2" />

      {/* Insert Image */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
        title="Insert Image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
