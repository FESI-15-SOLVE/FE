'use client';

import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Loader2, FileImage, AlertCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function ImageUploadBlockNodeView(props: NodeViewProps) {
  const { node, deleteNode } = props;
  const { fileName, fileSize, progress = 0, error } = node.attrs;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode();
  };

  return (
    <NodeViewWrapper className="my-3 w-full max-w-xl select-none">
      <div
        className={cn(
          'flex flex-col gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 transition-colors shadow-xs',
          error && 'bg-rose-50/70 border-rose-200',
        )}
      >
        {/* Top File Info Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={cn(
                'p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shrink-0',
                error && 'border-rose-200 text-rose-500 bg-rose-100/50',
              )}
            >
              <FileImage className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-800 truncate tracking-tight">
                {fileName ?? '이미지 파일 업로드 중'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {formatFileSize(fileSize)}
              </span>
            </div>
          </div>

          {/* Status Icon or Delete Button */}
          <div className="flex items-center gap-2 shrink-0">
            {!error && progress < 100 && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00bb86]">
                <Loader2 className="w-4 h-4 animate-spin text-[#00bb86]" />
                <span>{progress}%</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-rose-500">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100/60 rounded-lg transition-colors cursor-pointer"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Container */}
        {!error && (
          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#00bb86] h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
