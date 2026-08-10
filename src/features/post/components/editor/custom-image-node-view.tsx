'use client';

import React from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Loader2, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CustomImageNodeView(props: NodeViewProps) {
  const { node, deleteNode, getPos } = props;
  const { src, alt, isUploading, uploadError } = node.attrs;

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rawFile = node.attrs.rawFile as File | undefined;
    if (rawFile && typeof getPos === 'function') {
      const pos = getPos();
      if (typeof pos === 'number') {
        window.dispatchEvent(
          new CustomEvent('tiptap:retry-image', {
            detail: { file: rawFile, pos },
          }),
        );
      }
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode();
  };

  return (
    <NodeViewWrapper className="relative inline-block my-2 max-w-full overflow-hidden rounded-2xl group">
      {/* Main Image */}
      <img
        src={src}
        alt={alt ?? '게시글 첨부 이미지'}
        className={cn(
          'block max-w-full h-auto rounded-2xl transition-opacity duration-200',
          isUploading && 'opacity-40 blur-[1px]',
          uploadError && 'opacity-60 border-2 border-rose-500',
        )}
      />

      {/* Loading Overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/30 backdrop-blur-[2px] rounded-2xl p-4 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mb-2" />
          <span className="text-xs font-semibold tracking-tight drop-shadow-sm">
            이미지 업로드 중...
          </span>
        </div>
      )}

      {/* Error Overlay with Action Buttons */}
      {uploadError && !isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-950/60 backdrop-blur-[2px] rounded-2xl p-4 text-white gap-2">
          <div className="flex items-center gap-1.5 text-rose-200 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{typeof uploadError === 'string' ? uploadError : '업로드 실패'}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={handleRetry}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
              재시도
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              삭제
            </button>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
}
