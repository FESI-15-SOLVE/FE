'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button, UtilityButton } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { IconPerson } from '@/components/icons';

export interface DetailCardProps {
  meeting: {
    id: string;
    title: string;
    imageUrl: string;
    location: string;
    date: string;
    time: string;
    participantCount: number;
    maxParticipant: number;
    isSaved: boolean;
  };
  badgeStatuses?: Array<'confirmed' | 'pending' | 'completed' | 'upcoming'>;
  actionStatus?: 'reserved' | 'completed' | 'canceled';
  onClick?: () => void;
  onSaveClick?: (e: React.MouseEvent) => void;
  onActionClick?: (e: React.MouseEvent) => void;
}

export function DetailCard({
  meeting,
  badgeStatuses = [],
  actionStatus,
  onClick,
  onSaveClick,
  onActionClick,
}: DetailCardProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveClick?.(e);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick?.(e);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white relative overflow-hidden flex cursor-pointer transition-shadow hover:shadow-md border border-gray-100',
        // 모바일: 이미지 상단, 콘텐츠 하단 스택
        'flex-col w-full rounded-3xl pb-5',
        // 데스크톱: 이미지 좌측, 콘텐츠 우측
        'sm:flex-row sm:h-59 sm:p-6 sm:gap-6',
      )}
    >
      {/* 썸네일 이미지 영역 */}
      <div className="relative shrink-0 w-full h-39 sm:w-47 sm:h-47 sm:rounded-3xl overflow-hidden bg-gray-100 rounded-t-3xl">
        <Image
          src={meeting.imageUrl}
          alt={meeting.title}
          fill
          className="object-cover"
        />
        {/* 모바일 하트 버튼 */}
        <div className="absolute top-4 right-4 sm:hidden z-10">
          <UtilityButton onClick={handleSaveClick} isActive={meeting.isSaved} />
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 px-5 mt-4 sm:px-0 sm:mt-0 py-1 justify-between">
        <div className="flex flex-col gap-3">
          {/* 배지 영역 */}
          {badgeStatuses.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badgeStatuses.map((status, idx) => (
                <StatusBadge key={idx} status={status} />
              ))}
            </div>
          )}

          {/* 제목 */}
          <h3 className="text-xl font-semibold text-gray-900 tracking-[-0.4px]">
            {meeting.title}
          </h3>

          {/* 상세 메타 정보 (참가자수, 위치, 날짜, 시간) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium mt-1">
            <div className="flex items-center gap-1 text-gray-900">
              <IconPerson className="size-4" />
              <span>
                {meeting.participantCount}/{meeting.maxParticipant}
              </span>
            </div>

            <MetaItem label="위치" value={meeting.location} ml />
            <Divider />

            <MetaItem label="날짜" value={meeting.date} />
            <Divider />

            <MetaItem label="시간" value={meeting.time} />
          </div>
        </div>

        {/* 하단 액션 및 데스크톱 하트 버튼 영역 */}
        <div className="flex items-center gap-4 mt-6 sm:mt-auto justify-end">
          {/* 데스크톱 하트 버튼 - 모바일에서는 숨김 (이미지 쪽에 있음) */}
          <div className="hidden sm:block absolute top-6 right-6">
            <UtilityButton
              onClick={handleSaveClick}
              isActive={meeting.isSaved}
            />
          </div>

          {/* 액션 버튼 */}
          {actionStatus === 'reserved' && (
            <Button
              onClick={handleActionClick}
              variant="tertiary"
              className="w-full sm:w-auto px-6 h-12 font-semibold text-brand-600 border-brand-600 border"
            >
              예약 취소하기
            </Button>
          )}
          {actionStatus === 'completed' && (
            <Button
              onClick={handleActionClick}
              variant="primary"
              className="w-full sm:w-auto px-6 h-12 font-semibold"
            >
              리뷰 작성하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
  ml,
}: {
  label: string;
  value: React.ReactNode;
  ml?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-1.5', ml && 'ml-1')}>
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-3.5 bg-gray-300 mx-0.5" />;
}
