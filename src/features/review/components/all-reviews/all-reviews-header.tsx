'use client';

import React from 'react';
import Image from 'next/image';
import img_review_lg from '@/assets/imgs/img_review_lg.svg?url';

export function AllReviewsHeader() {
  return (
    <div className="flex items-end gap-6.5 py-4">
      {/* 피그마 15347:204979 노드 대응 헤더 아이콘 */}
      <div className="relative w-24.25 h-22.75 shrink-0">
        <Image
          src={img_review_lg}
          alt="모든 리뷰 헤더 아이콘"
          fill
          sizes="100px"
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-[32px] font-semibold leading-none tracking-[-0.96px] text-slate-900">
          모든 리뷰
        </h1>
        <p className="text-base sm:text-xl font-medium text-slate-500 tracking-[-0.4px]">
          같이달램 이용자들은 이렇게 느꼈어요 🫶
        </p>
      </div>
    </div>
  );
}

