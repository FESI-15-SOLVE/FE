'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { IconPerson } from '@/components/icons';

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | string;
}

export function ProfileModal({ isOpen, onClose, userId }: ProfileModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<{
    nickname: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    // 실제 백엔드 연동 전까지 데이터를 가져오는 척하는 모의(Mock) 타이머
    const timer = setTimeout(() => {
      setProfile({
        nickname: '럽윈즈올',
        email: 'lovewins@codeit.com',
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          'border-none bg-white max-w-none w-auto outline-none',
          'p-6 sm:px-12 sm:pt-12 sm:pb-16',
          'rounded-[24px] sm:rounded-[40px]',
          'w-85.75 sm:w-100',
          'gap-6 sm:gap-6',
        )}
      >
        <DialogHeader className="opacity-0 absolute pointer-events-none">
          <DialogTitle>프로필 수정하기</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center w-full min-h-50">
          {isLoading ? (
            <div className="flex items-center justify-center text-neutral-500 font-medium">
              로딩 중...
            </div>
          ) : profile ? (
            <div className="flex flex-col items-center justify-center w-full gap-6">
              {/* 프로필 이미지 (임시) */}
              <div className="size-28.5 rounded-full bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                <IconPerson className="size-16" />
              </div>

              {/* 유저 정보 */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-2xl font-semibold text-neutral-900 leading-8">
                  {profile.nickname}
                </p>

                {/* 이메일 뱃지 (그라데이션 디자인 토큰 사용) */}
                <div className="flex items-center justify-center px-3 py-1.5 rounded-full bg-linear-to-r from-gradient-start-200 to-gradient-end-200">
                  <p className="text-sm font-medium text-slate-600 leading-5">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
