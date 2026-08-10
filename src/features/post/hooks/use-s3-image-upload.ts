'use client';

import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { getPresignedUrlAction } from '@/actions/image/image-actions';
import { unwrapAction } from '@/lib/safe-action';
import { PresignedUrlRequest } from '@/api/data-contracts';
import { toast } from 'sonner';
import axios from 'axios';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function getValidContentType(fileType: string): PresignedUrlRequest['contentType'] | null {
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') return 'image/jpeg';
  if (fileType === 'image/webp') return 'image/webp';
  if (fileType === 'image/gif') return 'image/gif';
  if (fileType === 'image/png') return 'image/png';
  return null;
}

export function useS3ImageUpload(editor: Editor | null) {
  const uploadImage = useCallback(
    async (file: File, targetPos?: number) => {
      if (!editor) return;

      // 1. 파일 제한 검증
      if (file.size > MAX_FILE_SIZE) {
        toast.error('파일 크기는 최대 10MB까지 업로드할 수 있습니다.');
        return;
      }

      const contentType = getValidContentType(file.type);
      if (!contentType) {
        toast.error('지원하지 않는 이미지 형식입니다. (PNG, JPEG, WebP, GIF 지원)');
        return;
      }

      const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      // 2. 지정된 위치(targetPos) 또는 현재 커서 위치에 ImageUploadBlock 노드 삽입
      if (typeof targetPos === 'number') {
        editor
          .chain()
          .focus()
          .insertContentAt(targetPos, {
            type: 'imageUploadBlock',
            attrs: {
              uploadId,
              fileName: file.name,
              fileSize: file.size,
              progress: 0,
              error: null,
            },
          })
          .run();
      } else {
        const currentPos = editor.state.selection.from;
        editor
          .chain()
          .focus()
          .insertContentAt(currentPos, {
            type: 'imageUploadBlock',
            attrs: {
              uploadId,
              fileName: file.name,
              fileSize: file.size,
              progress: 0,
              error: null,
            },
          })
          .run();
      }

      try {
        // 3. S3 Presigned URL 발급
        const { presignedUrl, publicUrl } = unwrapAction(
          await getPresignedUrlAction({
            fileName: file.name,
            contentType,
          }),
        );

        // 4. S3 PUT 업로드 및 실시간 진행률(0% ~ 100%) 갱신
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': contentType,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && !editor.isDestroyed) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              editor.commands.command(({ tr }) => {
                tr.doc.descendants((node, pos) => {
                  if (node.type.name === 'imageUploadBlock' && node.attrs.uploadId === uploadId) {
                    tr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      progress: percent,
                    });
                    return false;
                  }
                });
                return true;
              });
            }
          },
        });

        // 5. 성공: ImageUploadBlock 노드를 원자적으로 제거하고 standard Image 노드로 교체
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            tr.doc.descendants((node, pos) => {
              if (node.type.name === 'imageUploadBlock' && node.attrs.uploadId === uploadId) {
                // 노드 삭제 후 동일 위치에 Image 노드 삽입
                tr.replaceWith(
                  pos,
                  pos + node.nodeSize,
                  editor.schema.nodes.image.create({
                    src: publicUrl,
                    alt: file.name,
                  }),
                );
                return false;
              }
            });
            return true;
          });
        }
      } catch {
        // 6. 에러 처리
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            tr.doc.descendants((node, pos) => {
              if (node.type.name === 'imageUploadBlock' && node.attrs.uploadId === uploadId) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  error: '업로드 실패',
                });
                return false;
              }
            });
            return true;
          });
        }
      }
    },
    [editor],
  );

  return { uploadImage };
}
