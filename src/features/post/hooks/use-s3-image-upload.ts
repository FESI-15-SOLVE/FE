'use client';

import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { getPresignedUrlAction } from '@/actions/image/image-actions';
import { unwrapAction } from '@/lib/safe-action';
import { PresignedUrlRequest } from '@/api/data-contracts';
import { toast } from 'sonner';
import axios from 'axios';

function getValidContentType(
  fileType: string,
): PresignedUrlRequest['contentType'] | null {
  if (fileType === 'image/jpeg' || fileType === 'image/jpg')
    return 'image/jpeg';
  if (fileType === 'image/webp') return 'image/webp';
  if (fileType === 'image/gif') return 'image/gif';
  if (fileType === 'image/png') return 'image/png';
  return null;
}

/**
 *
 * 1. 선택 즉시(0ms) local Blob URL로 에디터 본문에 즉각 프리뷰 렌더링
 * 2. 백그라운드 S3 업로드 진행 후 성공 시 publicUrl로 원활하게 스와프
 * 3. Blob 메모리 해제(URL.revokeObjectURL)로 유수 방지
 */
export function useS3ImageUpload(editor: Editor | null) {
  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;

      const contentType = getValidContentType(file.type);
      if (!contentType) {
        toast.error(
          '지원하지 않는 이미지 형식입니다. (PNG, JPEG, WebP, GIF 지원)',
        );
        return;
      }

      // 1. 0ms 즉시 낙관적 프리뷰 생성 및 Tiptap 에디터 삽입
      const blobUrl = URL.createObjectURL(file);

      editor.chain().focus().setImage({ src: blobUrl, alt: file.name }).run();

      try {
        // 2. 백그라운드 S3 Presigned URL 발급
        const { presignedUrl, publicUrl } = unwrapAction(
          await getPresignedUrlAction({
            fileName: file.name,
            contentType,
          }),
        );

        // 3. S3 직접 PUT 업로드
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': contentType,
          },
        });

        // 4. 성공: 에디터 내 blobUrl 노드를 publicUrl로 스와프
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            tr.doc.descendants((node, pos) => {
              if (node.type.name === 'image' && node.attrs.src === blobUrl) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  src: publicUrl,
                });
                return false;
              }
            });
            return true;
          });
        }

        // 5. 임시 blob URL 메모리 정리
        URL.revokeObjectURL(blobUrl);
      } catch {
        // 6. 실패: 에디터에서 임시 blob 노드 제거 및 메모리 해제
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            tr.doc.descendants((node, pos) => {
              if (node.type.name === 'image' && node.attrs.src === blobUrl) {
                tr.delete(pos, pos + node.nodeSize);
                return false;
              }
            });
            return true;
          });
        }
        URL.revokeObjectURL(blobUrl);
        toast.error('이미지 업로드에 실패했습니다.');
      }
    },
    [editor],
  );

  return { uploadImage };
}
