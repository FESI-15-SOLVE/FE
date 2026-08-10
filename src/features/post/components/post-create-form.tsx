'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tiptap/react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createPostAction } from '@/actions/post/post-actions';
import {
  createPostSchema,
  type CreatePostFormValues,
} from '@/features/post/schema/post-schema';
import { unwrapAction } from '@/lib/safe-action';
import { TiptapEditor } from './editor/tiptap-editor';
import { ROUTES } from '@/constants/routes';
import { extractFirstImageFromAST, hasPendingUploadsInAST } from '../utils/extract-first-image';
import { Button } from '@/components/ui/button';
import { ErrorResponse } from '@/lib/error-response';

export function PostCreateForm() {
  const router = useRouter();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { isValid },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      image: null,
    },
  });

  const titleValue = useWatch({ control, name: 'title' }) || '';
  const titleLength = Math.min(titleValue.length, 30);

  const onSubmit = async (data: CreatePostFormValues) => {
    if (!editor) {
      toast.error('에디터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const editorText = editor.getText().trim();
    if (!editorText) {
      setError('content', { message: '본문 내용을 입력해주세요.' });
      toast.error('본문 내용을 입력해주세요.');
      return;
    }

    if (!editor.markdown) {
      toast.error(
        '에디터 초기화 오류입니다. 페이지 새로고침 후 다시 시도해주세요.',
      );
      return;
    }

    const jsonAST = editor.getJSON();
    const hasUnfinishedUpload = hasPendingUploadsInAST(jsonAST);
    if (hasUnfinishedUpload) {
      toast.error('이미지 업로드가 진행 중이거나 마무리되지 않았습니다.');
      return;
    }

    const contentMarkdown = editor.markdown.serialize(jsonAST);
    const firstImageUrl = extractFirstImageFromAST(jsonAST);

    try {
      setIsSubmitting(true);

      const createdPost = unwrapAction(
        await createPostAction({
          title: data.title.trim(),
          content: contentMarkdown,
          image: firstImageUrl,
        }),
      );

      toast.success('게시글이 등록되었습니다!');
      if (createdPost?.id) {
        router.push(ROUTES.TALK.DETAIL(createdPost.id));
      } else {
        router.push(ROUTES.TALK.LIST);
      }
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-[860px] mx-auto gap-6 py-8 px-4 sm:px-0"
    >
      {/* Title Bar & Submit Button (Figma Node: 15273:43147) */}
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Title Input Row */}
        <div className="flex-1 flex items-center justify-between border-b border-slate-200 pb-2">
          <input
            {...register('title', {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length > 30) {
                  const truncated = e.target.value.slice(0, 30);
                  setValue('title', truncated, { shouldValidate: true });
                }
              },
            })}
            type="text"
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
          disabled={!isValid || isSubmitting}
          className="h-12 px-6 rounded-xl bg-[#00bb86] hover:bg-[#009973] text-white font-semibold text-base transition-colors shrink-0 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
        >
          {isSubmitting ? '등록 중...' : '등록'}
        </Button>
      </div>

      {/* Main Tiptap Editor Container (Figma Node: 15273:43161) */}
      <div className="w-full min-h-[720px] flex flex-col">
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange } }) => (
            <TiptapEditor
              onEditorReady={setEditor}
              onUpdate={(ed) => onChange(ed.getText().trim())}
            />
          )}
        />
      </div>
    </form>
  );
}
