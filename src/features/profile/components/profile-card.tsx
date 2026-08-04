'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/providers/auth-provider';
import { ProfileEditModal } from './profile-edit-modal';
import IconPerson from '@/assets/icons/person.svg';
import IconEdit from '@/assets/icons/edit.svg';

export function ProfileCard() {
  const user = useAuthStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const nickname = user?.name || '사용자';
  const email = user?.email || '이메일 없음';
  const profileImage = user?.image;

  return (
    <>
      <div className="flex w-full flex-col rounded-2xl border border-green-400 p-5 shadow-sm lg:w-72 lg:shrink-0 lg:rounded-3xl lg:p-6 bg-linear-to-r from-gradient-start-100 to-gradient-end-100">
        <div className="flex items-center gap-8 lg:flex-col lg:items-center lg:text-center">
          {/* Avatar Image */}
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            aria-label="프로필 수정"
            className="group relative size-16 shrink-0 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer border border-slate-200 hover:border-slate-400 transition-all lg:size-28"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt={nickname}
                fill
                className="object-cover"
              />
            ) : (
              <IconPerson className="size-10 lg:size-16" />
            )}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <IconEdit className="size-4 lg:size-6" />
            </div>
          </button>

          {/* User Details */}
          <div className="flex flex-col gap-6 flex-1 min-w-0 lg:items-center">
            {/* Nickname & Edit Button */}
            <div className="flex items-center gap-1.5 lg:justify-center">
              <span className="text-lg font-bold text-slate-900 truncate lg:text-xl">
                {nickname}
              </span>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                aria-label="프로필 수정"
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <IconEdit className="size-4 lg:size-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 lg:justify-center">
              <span className="inline-flex items-center rounded-md bg-linear-to-r from-gradient-start-200 to-gradient-end-200 px-2.5 py-1 text-slate-600 truncate max-w-48 sm:max-w-none">
                {email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Edit Profile Modal */}
      {user && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
