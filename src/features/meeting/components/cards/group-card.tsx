'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button, UtilityButton } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import { Tag } from '@/components/ui/tag';
import { StatusLabel } from '@/components/ui/label';
import { IconThumbsUp } from '@/components/icons';
import AlarmTag from '@/components/ui/tag/alarm-tag';

export interface GroupCardProps {
  meeting: {
    id: string;
    title: string;
    imageUrl: string;
    location: string;
    category: string;
    date: string;
    time: string;
    deadlineTag?: string;
    participantCount: number;
    maxParticipant: number;
    isSaved: boolean;
  };
  isConfirmed?: boolean;
  isClosed?: boolean;
  onClick?: () => void;
  onSaveClick?: (e: React.MouseEvent) => void;
  onJoinClick?: (e: React.MouseEvent) => void;
}

export function GroupCard({
  meeting,
  isConfirmed = false,
  isClosed = false,
  onClick,
  onSaveClick,
  onJoinClick,
}: GroupCardProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveClick?.(e);
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isClosed) {
      onJoinClick?.(e);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white relative overflow-hidden flex cursor-pointer transition-shadow hover:shadow-md border border-gray-100',
        'flex-col w-full rounded-3xl pb-5',
        'sm:flex-row sm:p-6 sm:gap-5 sm:items-stretch',
      )}
    >
      {/* 썸네일 영역 */}
      <div className="relative shrink-0 w-full h-39 sm:w-42.5 sm:h-42.5 sm:rounded-3xl overflow-hidden bg-gray-100 rounded-t-3xl">
        <Image
          src={meeting.imageUrl}
          alt={meeting.title}
          fill
          className="object-cover"
        />
        {isClosed && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-extrabold text-2xl tracking-tight">
              모집 마감
            </span>
          </div>
        )}

        {/* 모바일 아이콘 (마감 여부에 따라 하트 또는 박수) */}
        <div className="absolute top-4 right-4 sm:hidden z-10">
          {isClosed ? (
            <div className="bg-slate-100 rounded-full flex items-center justify-center text-slate-500 size-12 shadow-sm border border-slate-200">
              <IconThumbsUp className="size-6" />
            </div>
          ) : (
            <UtilityButton
              onClick={handleSaveClick}
              isActive={meeting.isSaved}
            />
          )}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 px-5 mt-4 sm:px-0 sm:mt-0 justify-between">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* 제목 영역 */}
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-[-0.4px]">
              {meeting.title}
            </h3>
            {isConfirmed && (
              <StatusLabel
                size="lg"
                label="개설확정"
                className="scale-90 origin-left"
              />
            )}
          </div>

          {/* 서브타이틀 (위치, 카테고리) */}
          <div className="flex items-center gap-1.5 text-sm sm:text-base text-gray-500 font-medium">
            <span>{meeting.location}</span>
            <span>·</span>
            <span>{meeting.category}</span>
          </div>

          {/* 태그 영역 */}
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="lg">{meeting.date}</Tag>
            <Tag size="lg">{meeting.time}</Tag>
            {meeting.deadlineTag && <AlarmTag>{meeting.deadlineTag}</AlarmTag>}
          </div>
        </div>

        {/* 하단 프로그레스 바 및 액션 버튼 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-auto relative">
          {/* 데스크톱 상단 아이콘 (이미지에 없음, 콘텐츠 영역 우상단에 위치) */}
          <div className="hidden sm:block absolute -top-32 right-2 z-10">
            {isClosed ? (
              <div className="bg-slate-100 rounded-full flex items-center justify-center text-slate-500 size-12 shadow-sm border border-slate-200">
                <IconThumbsUp className="size-6" />
              </div>
            ) : (
              <UtilityButton
                onClick={handleSaveClick}
                isActive={meeting.isSaved}
              />
            )}
          </div>

          <div className="w-full sm:w-64 shrink-0">
            <ProgressBar
              current={meeting.participantCount}
              total={meeting.maxParticipant}
              showIcon={true}
              showCounter={true}
            />
          </div>

          <Button
            onClick={handleJoinClick}
            disabled={isClosed}
            variant={isClosed ? 'secondary' : 'primary'}
            className="w-full sm:w-auto px-6 h-12 font-semibold"
          >
            참여하기
          </Button>
        </div>
      </div>
    </div>
  );
}
