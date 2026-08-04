'use client';

import { cn } from '@/lib/utils';
import { DeleteButton } from '@/components/ui/button';
import IconImagePlus from '@/assets/icons/image-plus.svg';
import { useFileInput } from '@/hooks/use-file-input';

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
  const {
    fileInputRef,
    previewUrl,
    handleClick,
    handleFileChange,
    handleDelete,
  } = useFileInput({ value, onChange, disabled });

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
