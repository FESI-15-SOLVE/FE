'use client';

import { cn } from '@/lib/utils';
import { DeleteButton } from '@/components/ui/button';
import { useEffect, useRef, useMemo } from 'react';
import IconImagePlus from '@/assets/icons/image-plus.svg';

export interface FileInputProps {
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  size?: 'lg' | 'sm';
  disabled?: boolean;
  accept?: string;
  className?: string;
}

function FileInput({
  value,
  onChange,
  size = 'lg',
  disabled = false,
  className,
  accept = 'image/*',
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl && typeof value !== 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const handleClick = () => {
    if (disabled) return;
    if (!previewUrl) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onChange) {
      onChange(file);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (onChange) {
      onChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="파일 첨부"
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        'relative flex flex-col items-center justify-center bg-gray-50 rounded-xl transition-colors cursor-pointer select-none overflow-hidden',
        size === 'lg' ? 'w-36.75 h-36.75' : 'w-28.5 h-28.5',
        disabled && 'opacity-50 cursor-not-allowed',
        !previewUrl && 'hover:bg-gray-100',
        className,
      )}
      style={
        previewUrl
          ? {
              backgroundImage: `url(${previewUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        disabled={disabled}
        className="hidden"
      />

      {!previewUrl && (
        <div className="flex flex-col items-center justify-center gap-2">
          <IconImagePlus className="text-slate-500" />
          <span
            className={cn(
              'font-medium text-neutral-400',
              size === 'lg' ? 'text-base' : 'text-sm',
            )}
          >
            파일 첨부
          </span>
        </div>
      )}

      {previewUrl && (
        <DeleteButton
          onClick={handleDelete}
          className="top-2 right-2 absolute"
        />
      )}
    </div>
  );
}

export { FileInput };
