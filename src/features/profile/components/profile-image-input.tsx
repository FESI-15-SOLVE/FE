'use client';

import Image from 'next/image';
import { useFileInput } from '@/hooks/use-file-input';
import IconPerson from '@/assets/icons/person.svg';
import IconEdit from '@/assets/icons/edit.svg';

export interface ProfileImageInputProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
}

export function ProfileImageInput({
  value,
  onChange,
  disabled = false,
}: ProfileImageInputProps) {
  const { fileInputRef, previewUrl, handleClick, handleFileChange } =
    useFileInput({ value, onChange, disabled });

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-label="프로필 사진 변경"
        className="group relative size-28 shrink-0 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-2 border-slate-200 hover:border-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        ) : (
          <IconPerson className="size-16 text-slate-300" />
        )}

        {/* Hover overlay for changing picture */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
          <IconEdit className="size-5" />
          <span className="text-xs font-medium">사진 변경</span>
        </div>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}
