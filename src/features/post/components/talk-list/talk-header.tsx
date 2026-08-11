'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import img_talk_lg from '@/assets/imgs/img_talk_lg.svg?url';
import { useAuthAction } from '@/hooks/use-auth-action';

export function TalkHeader() {
  const router = useRouter();
  const withAuth = useAuthAction();

  const handleCreate = withAuth(() => router.push(ROUTES.TALK.CREATE));

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full pt-2">
      {/* Left: Graphic Head & Title/Subtitle */}
      <div className="flex items-end gap-4 sm:gap-6">
        <div className="relative w-20 h-18 sm:w-24.25 sm:h-22.75 shrink-0">
          <Image
            src={img_talk_lg}
            alt="달램 토크 헤더 아이콘"
            fill
            sizes="100px"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-2xl sm:text-[32px] font-bold text-slate-900 leading-tight sm:leading-9 tracking-[-0.96px]">
            달램 토크
          </h1>
          <p className="text-sm sm:text-xl text-slate-500 font-medium leading-snug tracking-[-0.4px]">
            달램 토크에서 자유롭게 이야기해요 💬
          </p>
        </div>
      </div>

      {/* Right: Create Post Button — 데스크탑만, 모바일은 FAB 사용 */}
      <Button
        type="button"
        onClick={handleCreate}
        className="hidden md:flex self-end sm:self-auto shrink-0 h-12 sm:h-14 px-5 sm:px-7 py-3.5 rounded-3xl bg-green-500 hover:bg-green-600 text-white font-bold text-base sm:text-xl tracking-[-0.4px] transition-colors items-center gap-1.5 shadow-none cursor-pointer"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
        <span>게시물 등록하기</span>
      </Button>
    </div>
  );
}
