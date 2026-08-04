'use client';

import { useRef, useState } from 'react';
import { useImagePreview } from './use-image-preview';

export interface UseFileInputOptions {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
}

export function useFileInput({
  value,
  onChange,
  disabled = false,
}: UseFileInputOptions = {}) {
  const [uncontrolledFile, setUncontrolledFile] = useState<
    File | string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFile = value !== undefined ? value : uncontrolledFile;
  const previewUrl = useImagePreview(currentFile);

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (value === undefined) {
      setUncontrolledFile(file);
    }
    onChange?.(file);
  };

  const handleDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disabled) return;
    if (value === undefined) {
      setUncontrolledFile(null);
    }
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    fileInputRef,
    previewUrl,
    selectedFile: currentFile,
    handleClick,
    handleFileChange,
    handleDelete,
  };
}
