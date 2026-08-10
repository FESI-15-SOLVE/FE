'use client';

import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { getPresignedUrlAction } from '@/actions/image/image-actions';
import { unwrapAction } from '@/lib/safe-action';
import { PresignedUrlRequest } from '@/api/data-contracts';
import { toast } from 'sonner';
import axios from 'axios';

function getValidContentType(fileType: string): PresignedUrlRequest['contentType'] | null {
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') return 'image/jpeg';
  if (fileType === 'image/webp') return 'image/webp';
  if (fileType === 'image/gif') return 'image/gif';
  if (fileType === 'image/png') return 'image/png';
  return null;
}

/**
 * Tiptap 공식 표준: S3 Presigned URL에 파일 직접 업로드 후
 * 기본 Image 확장의 editor.commands.setImage({ src })로 깔끔하게 주입하는 경량화 훅
 */
export function useS3ImageUpload(editor: Editor | null) {
  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;

      const contentType = getValidContentType(file.type);
      if (!contentType) {
        toast.error('지원하지 않는 이미지 형식입니다. (PNG, JPEG, WebP, GIF 지원)');
        return;
      }

      const toastId = toast.loading('이미지 업로드 중...');

      try {
        // 1. S3 Presigned URL 발급
        const { presignedUrl, publicUrl } = unwrapAction(
          await getPresignedUrlAction({
            fileName: file.name,
            contentType,
          }),
        );

        // 2. S3 직접 PUT 업로드
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': contentType,
          },
        });

        // 3. Tiptap 공식 Image 커맨드로 이미지 삽입
        if (!editor.isDestroyed) {
          editor
            .chain()
            .focus()
            .setImage({ src: publicUrl, alt: file.name })
            .run();
        }

        toast.success('이미지 업로드가 완료되었습니다.', { id: toastId });
      } catch {
        toast.error('이미지 업로드에 실패했습니다.', { id: toastId });
      }
    },
    [editor],
  );

  return { uploadImage };
}
