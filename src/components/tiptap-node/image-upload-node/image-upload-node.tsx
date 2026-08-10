'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { NodeViewProps } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { CloseIcon } from '@/components/tiptap-icons/close-icon';
import { focusNextNode, isValidPosition } from '@/lib/tiptap-utils';

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  abortController?: AbortController;
}

export interface UploadOptions {
  maxSize: number;
  limit: number;
  accept: string;
  upload: (
    file: File,
    onProgress: (event: { progress: number }) => void,
    signal: AbortSignal,
  ) => Promise<string>;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

function useFileUpload(options: UploadOptions) {
  const [fileItems, setFileItems] = useState<FileItem[]>([]);
  const fileItemsRef = useRef<FileItem[]>([]);

  useEffect(() => {
    fileItemsRef.current = fileItems;
  }, [fileItems]);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > options.maxSize) {
      const error = new Error(
        `File size exceeds maximum allowed (${options.maxSize / 1024 / 1024}MB)`,
      );
      options.onError?.(error);
      return null;
    }

    const abortController = new AbortController();
    const fileId = crypto.randomUUID();

    const newFileItem: FileItem = {
      id: fileId,
      file,
      progress: 0,
      status: 'uploading',
      abortController,
    };

    setFileItems((prev) => [...prev, newFileItem]);

    try {
      if (!options.upload) {
        throw new Error('Upload function is not defined');
      }

      const url = await options.upload(
        file,
        (event: { progress: number }) => {
          setFileItems((prev) =>
            prev.map((item) =>
              item.id === fileId ? { ...item, progress: event.progress } : item,
            ),
          );
        },
        abortController.signal,
      );

      if (!url) throw new Error('Upload failed: No URL returned');

      if (!abortController.signal.aborted) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? { ...item, status: 'success', url, progress: 100 }
              : item,
          ),
        );
        options.onSuccess?.(url);
        return url;
      }

      return null;
    } catch (error) {
      if (!abortController.signal.aborted) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? { ...item, status: 'error', progress: 0 }
              : item,
          ),
        );
        options.onError?.(
          error instanceof Error ? error : new Error('Upload failed'),
        );
      }
      return null;
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
      options.onError?.(new Error('No files to upload'));
      return [];
    }

    if (options.limit && files.length > options.limit) {
      options.onError?.(
        new Error(
          `Maximum ${options.limit} file${options.limit === 1 ? '' : 's'} allowed`,
        ),
      );
      return [];
    }

    const uploadPromises = files.map((file) => uploadFile(file));
    const results = await Promise.all(uploadPromises);

    return results.filter((url): url is string => url !== null);
  };

  const removeFileItem = (fileId: string) => {
    setFileItems((prev) => {
      const fileToRemove = prev.find((item) => item.id === fileId);
      if (fileToRemove?.abortController) {
        fileToRemove.abortController.abort();
      }
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((item) => item.id !== fileId);
    });
  };

  const clearAllFiles = () => {
    fileItems.forEach((item) => {
      if (item.abortController) {
        item.abortController.abort();
      }
      if (item.url) {
        URL.revokeObjectURL(item.url);
      }
    });
    setFileItems([]);
  };

  const abortAll = useCallback(() => {
    fileItemsRef.current.forEach((item) => item.abortController?.abort());
    fileItemsRef.current.forEach(
      (item) => item.url && URL.revokeObjectURL(item.url),
    );
    setFileItems([]);
  }, []);

  return {
    fileItems,
    uploadFiles,
    removeFileItem,
    clearAllFiles,
    abortAll,
  };
}

const CloudUploadIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    className="w-4 h-4 text-white shrink-0"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1953 4.41771C10.3478 4.08499 9.43578 3.94949 8.5282 4.02147C7.62062 4.09345 6.74133 4.37102 5.95691 4.83316C5.1725 5.2953 4.50354 5.92989 4.00071 6.68886C3.49788 7.44783 3.17436 8.31128 3.05465 9.2138C2.93495 10.1163 3.0222 11.0343 3.3098 11.8981C3.5974 12.7619 4.07781 13.5489 4.71463 14.1995C5.10094 14.5942 5.09414 15.2274 4.69945 15.6137C4.30476 16 3.67163 15.9932 3.28532 15.5985C2.43622 14.731 1.79568 13.6816 1.41221 12.5299C1.02875 11.3781 0.91241 10.1542 1.07201 8.95084C1.23162 7.74748 1.66298 6.59621 2.33343 5.58425C3.00387 4.57229 3.89581 3.72617 4.9417 3.10998C5.98758 2.4938 7.15998 2.1237 8.37008 2.02773C9.58018 1.93176 10.7963 2.11243 11.9262 2.55605C13.0561 2.99968 14.0703 3.69462 14.8919 4.58825C15.5423 5.29573 16.0585 6.11304 16.4177 7.00002H17.4999C18.6799 6.99991 19.8288 7.37933 20.7766 8.08222C21.7245 8.78515 22.4212 9.7743 22.7637 10.9036C23.1062 12.0328 23.0765 13.2423 22.6788 14.3534C22.2812 15.4644 21.5367 16.4181 20.5554 17.0736C20.0962 17.3803 19.4752 17.2567 19.1684 16.7975C18.8617 16.3382 18.9853 15.7172 19.4445 15.4105C20.069 14.9934 20.5427 14.3865 20.7958 13.6794C21.0488 12.9724 21.0678 12.2027 20.8498 11.4841C20.6318 10.7655 20.1885 10.136 19.5853 9.6887C18.9821 9.24138 18.251 8.99993 17.5001 9.00002H15.71C15.2679 9.00002 14.8783 8.70973 14.7518 8.28611C14.4913 7.41374 14.0357 6.61208 13.4195 5.94186C12.8034 5.27164 12.0427 4.75043 11.1953 4.41771Z"
      fill="currentColor"
    />
    <path
      d="M11 14.4142V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V14.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L12.7078 11.2936C12.7054 11.2912 12.703 11.2888 12.7005 11.2864C12.5208 11.1099 12.2746 11.0008 12.003 11L12 11L11.997 11C11.8625 11.0004 11.7343 11.0273 11.6172 11.0759C11.502 11.1236 11.3938 11.1937 11.2995 11.2864C11.297 11.2888 11.2946 11.2912 11.2922 11.2936L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L11 14.4142Z"
      fill="currentColor"
    />
  </svg>
);

interface ImageUploadPreviewProps {
  fileItem: FileItem;
  onRemove: () => void;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  fileItem,
  onRemove,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs transition-colors">
      {fileItem.status === 'uploading' && (
        <div
          className="absolute inset-0 bg-[#00bb86]/10 transition-all duration-300 ease-out"
          style={{ width: `${fileItem.progress}%` }}
        />
      )}

      <div className="relative p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-[#00bb86] rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs">
            <CloudUploadIcon />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-800 truncate tracking-tight">
              {fileItem.file.name}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {formatFileSize(fileItem.file.size)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          {fileItem.status === 'uploading' && (
            <span className="text-xs font-semibold text-[#00bb86]">
              {fileItem.progress}%
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-100/60 rounded-lg transition-colors cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ImageUploadNode: React.FC<NodeViewProps> = (props) => {
  const { accept, limit, maxSize } = props.node.attrs;
  const extension = props.extension;
  const hasTriggeredRef = useRef(false);
  const cancelUnmountRef = useRef<(() => void) | null>(null);

  const uploadOptions: UploadOptions = {
    maxSize,
    limit,
    accept,
    upload: extension.options.upload,
    onSuccess: extension.options.onSuccess,
    onError: extension.options.onError,
  };

  const { fileItems, uploadFiles, removeFileItem, clearAllFiles, abortAll } =
    useFileUpload(uploadOptions);

  const handleUpload = async (files: File[]) => {
    const urls = await uploadFiles(files);
    if (!urls.length) return;

    const pos = props.getPos();
    if (!isValidPosition(pos)) return;

    const imageNodes = urls.map((url, index) => {
      const filename = files[index]?.name.replace(/\.[^/.]+$/, '') || 'unknown';
      return {
        type: extension.options.type,
        attrs: {
          ...extension.options,
          src: url,
          alt: filename,
          title: filename,
        },
      };
    });

    props.editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + props.node.nodeSize })
      .insertContentAt(pos, imageNodes)
      .run();

    focusNextNode(props.editor);
  };

  useEffect(() => {
    cancelUnmountRef.current?.();

    if (!hasTriggeredRef.current) {
      const uploadId = props.node.attrs.uploadId;
      const storage = extension.storage;
      const files = uploadId ? storage.pendingFiles.get(uploadId) : undefined;

      if (files?.length) {
        hasTriggeredRef.current = true;
        storage.pendingFiles.delete(uploadId!);
        handleUpload(files);
      }
    }

    return () => {
      const timerId = setTimeout(() => abortAll(), 0);
      cancelUnmountRef.current = () => clearTimeout(timerId);
    };
    // 해당 코드는 개발 환경에서 2번 렌더링될 때 cleanup 함수가 중복 호출되는 현상을 방지하기 위함
    // 해당 코드가 없으면 개발 환경에서 이미지 업로드가 올리자마자 자동 클린업으로 인해 abort 되는 현상이 발생함
    // 개발 환경에서만 필요한 내용이다보니 의존성 배열에 추가하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NodeViewWrapper className="my-4 w-full max-w-xl select-none" tabIndex={0}>
      <div className="flex flex-col gap-3">
        {fileItems.length > 1 && (
          <div className="flex items-center justify-between py-2 border-b border-slate-200">
            <span className="text-sm font-semibold text-slate-700">
              Uploading {fileItems.length} files
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                clearAllFiles();
                props.deleteNode();
              }}
              className="text-xs text-rose-500 hover:bg-rose-50"
            >
              Clear All
            </Button>
          </div>
        )}
        {fileItems.map((fileItem) => (
          <ImageUploadPreview
            key={fileItem.id}
            fileItem={fileItem}
            onRemove={() => {
              removeFileItem(fileItem.id);
              props.deleteNode();
            }}
          />
        ))}
      </div>
    </NodeViewWrapper>
  );
};
