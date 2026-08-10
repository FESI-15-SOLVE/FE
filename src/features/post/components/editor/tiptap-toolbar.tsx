'use client';

import React, { useRef } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TiptapToolbarProps {
  editor: Editor | null;
  onImageSelect: (file: File) => void;
}

export function TiptapToolbar({ editor, onImageSelect }: TiptapToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };

  return (
    <div className="bg-[#f6f7f9] flex items-center gap-1 px-6 py-4 rounded-[24px] w-full shrink-0 select-none">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          'p-1.5 rounded-md transition-colors cursor-pointer text-slate-600 hover:bg-slate-200/60',
          editor.isActive('bold') && 'bg-slate-900 text-white hover:bg-slate-800',
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
          'p-1.5 rounded-md transition-colors cursor-pointer text-slate-600 hover:bg-slate-200/60',
          editor.isActive('italic') && 'bg-slate-900 text-white hover:bg-slate-800',
        )}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'p-1.5 rounded-md transition-colors cursor-pointer text-slate-600 hover:bg-slate-200/60',
          editor.isActive('bulletList') && 'bg-slate-900 text-white hover:bg-slate-800',
        )}
        title="Bullet List"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* Insert Image */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-1.5 rounded-md transition-colors cursor-pointer text-slate-600 hover:bg-slate-200/60"
        title="Insert Image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
