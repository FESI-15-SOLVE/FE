'use client';

import { useRef, useCallback, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { getPresignedUrlAction } from '@/actions/image/image-actions';
import { unwrapAction } from '@/lib/safe-action';
import { PresignedUrlRequest } from '@/api/data-contracts';
import axios from 'axios';

function getValidContentType(fileType: string): PresignedUrlRequest['contentType'] {
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') return 'image/jpeg';
  if (fileType === 'image/webp') return 'image/webp';
  if (fileType === 'image/gif') return 'image/gif';
  return 'image/png';
}

export function useS3ImageUpload(editor: Editor | null) {
  const activeBlobsRef = useRef<Set<string>>(new Set());

  // 페이지 이탈 / 언마운트 시 남아있는 모든 임시 blob URL 메모리 정리
  const cleanupActiveBlobs = useCallback(() => {
    activeBlobsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    activeBlobsRef.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      cleanupActiveBlobs();
    };
  }, [cleanupActiveBlobs]);

  const uploadImage = useCallback(
    async (file: File, targetPos?: number) => {
      if (!editor) return;

      // 1. 0ms 블롭 임시 프리뷰 생성
      const blobUrl = URL.createObjectURL(file);
      activeBlobsRef.current.add(blobUrl);

      let nodePos = targetPos;

      if (nodePos === undefined) {
        // 커서 위치에 노드 신규 삽입
        const currentPos = editor.state.selection.from;
        editor
          .chain()
          .focus()
          .insertContentAt(currentPos, {
            type: 'image',
            attrs: {
              src: blobUrl,
              alt: file.name,
              isUploading: true,
              uploadError: null,
              rawFile: file,
            },
          })
          .run();
        nodePos = currentPos;
      } else {
        // 재시도 시 기존 노드 속성 업데이트
        editor.commands.command(({ tr }) => {
          tr.setNodeMarkup(nodePos!, undefined, {
            src: blobUrl,
            alt: file.name,
            isUploading: true,
            uploadError: null,
            rawFile: file,
          });
          return true;
        });
      }

      try {
        // 2. S3 Presigned URL 발급 (fileName, contentType 필수)
        const contentType = getValidContentType(file.type);
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

        // 4. 성공: publicUrl로 치환 및 isUploading: false 처리
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            let foundPos = nodePos;
            tr.doc.descendants((node, pos) => {
              if (node.attrs.src === blobUrl) {
                foundPos = pos;
                return false;
              }
            });

            if (typeof foundPos === 'number') {
              tr.setNodeMarkup(foundPos, undefined, {
                src: publicUrl,
                alt: file.name,
                isUploading: false,
                uploadError: null,
                rawFile: null,
              });
            }
            return true;
          });
        }

        // 5. 메모리 정리
        URL.revokeObjectURL(blobUrl);
        activeBlobsRef.current.delete(blobUrl);
      } catch {
        // 6. 에러 처리
        if (!editor.isDestroyed) {
          editor.commands.command(({ tr }) => {
            let foundPos = nodePos;
            tr.doc.descendants((node, pos) => {
              if (node.attrs.src === blobUrl) {
                foundPos = pos;
                return false;
              }
            });

            if (typeof foundPos === 'number') {
              tr.setNodeMarkup(foundPos, undefined, {
                src: blobUrl,
                alt: file.name,
                isUploading: false,
                uploadError: '업로드 실패',
                rawFile: file,
              });
            }
            return true;
          });
        }
      }
    },
    [editor],
  );

  // CustomEvent 'tiptap:retry-image' 이벤트 수신
  useEffect(() => {
    const handleRetryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ file: File; pos?: number }>;
      if (customEvent.detail?.file) {
        uploadImage(customEvent.detail.file, customEvent.detail.pos);
      }
    };

    window.addEventListener('tiptap:retry-image', handleRetryEvent);
    return () => {
      window.removeEventListener('tiptap:retry-image', handleRetryEvent);
    };
  }, [uploadImage]);

  return { uploadImage, cleanupActiveBlobs };
}
