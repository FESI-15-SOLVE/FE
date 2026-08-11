'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkTiptapMarks } from './remark-tiptap-marks';
import { cn } from '@/lib/utils';

export interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  if (!content) return null;

  return (
    <div
      className={cn(
        'prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-800 tracking-[-0.32px]',
        'prose-headings:font-bold prose-headings:text-slate-900',
        'prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline',
        'prose-img:rounded-2xl prose-img:max-h-[500px] prose-img:object-cover prose-img:my-4',
        'prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-slate-800 prose-code:font-mono prose-code:before:content-none prose-code:after:content-none',
        'prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkTiptapMarks]}
        components={{
          ins: ({ children, ...props }) => (
            <u className="underline underline-offset-4 font-normal" {...props}>
              {children}
            </u>
          ),
          mark: ({ children, ...props }) => (
            <mark className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-medium" {...props}>
              {children}
            </mark>
          ),
          img: ({ node, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              alt={props.alt || '첨부 이미지'}
              className="rounded-2xl max-h-[500px] w-auto h-auto max-w-full object-contain my-4 border border-slate-100"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
