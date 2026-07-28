'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/tag';
import { Button, UtilityButton } from '@/components/ui/button';
import { IconCrown, IconMeatballs } from '@/components/icons';
import AlarmTag from '@/components/ui/tag/alarm-tag';
import { MeetingJoinButton } from '../detail/meeting-join-button';

export interface InformationCardProps {
  meeting: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    deadlineTag?: string;
    isSaved: boolean;
  };
  isHost?: boolean;
  isJoined?: boolean;
  isFull?: boolean;
  isRegistrationClosed?: boolean;
  isCanceled?: boolean;
  isPending?: boolean;
  onClick?: () => void;
  onSaveClick?: (e: React.MouseEvent) => void;
  onJoinClick?: (e: React.MouseEvent) => void;
  onOptionsClick?: (e: React.MouseEvent) => void;
}

export function InformationCard({
  meeting,
  isHost = false,
  isJoined = false,
  isFull = false,
  isRegistrationClosed = false,
  isCanceled = false,
  isPending = false,
  onClick,
  onSaveClick,
  onJoinClick,
  onOptionsClick,
}: InformationCardProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveClick?.(e);
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinClick?.(e);
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOptionsClick?.(e);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white relative overflow-hidden flex cursor-pointer transition-shadow hover:shadow-md border border-gray-100',
        // 모바일 레이아웃
        'flex-col w-full p-5 px-6 rounded-2xl gap-2.5',
        // 데스크톱 레이아웃
        'sm:flex-col sm:p-8.5 sm:px-10 sm:rounded-3xl sm:gap-10',
      )}
    >
      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 w-full sm:h-full gap-4 sm:gap-6">
        {/* 태그 영역 */}
        <div className="flex flex-wrap items-center gap-2">
          {meeting.deadlineTag && <AlarmTag>{meeting.deadlineTag}</AlarmTag>}
          <Tag>{meeting.date}</Tag>
          <Tag>{meeting.time}</Tag>
        </div>

        {/* 제목 및 방장 표시 */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <h3 className="text-lg sm:text-3xl font-semibold text-gray-800 tracking-[-0.36px] sm:tracking-[-0.84px]">
            {meeting.title}
          </h3>
          {isHost && (
            <div className="size-6 sm:size-8 text-yellow-500 flex items-center justify-center">
              <IconCrown className="size-full" />
            </div>
          )}
        </div>

        {/* 부가 정보 (지역, 카테고리) */}
        <div className="flex items-center gap-0.5 text-neutral-500">
          <span className="text-sm sm:text-base font-medium tracking-[-0.28px] sm:tracking-[-0.32px]">
            {meeting.location} · {meeting.category}
          </span>
        </div>
      </div>

      {/* 미트볼 아이콘 (더보기 메뉴) */}
      {isHost && (
        <button
          onClick={handleOptionsClick}
          className="absolute top-5 right-6 sm:top-8.5 sm:right-10 size-6 sm:size-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <IconMeatballs className="size-full" />
        </button>
      )}
      {/* 액션 버튼 (찜하기, 참여하기) */}
      <div className="flex items-center gap-2.5 sm:gap-4 w-full sm:h-15 mt-auto">
        <UtilityButton onClick={handleSaveClick} isActive={meeting.isSaved} />
        {!isHost && (
          <MeetingJoinButton
            isCanceled={isCanceled}
            isJoined={isJoined}
            isFull={isFull}
            isRegistrationClosed={isRegistrationClosed}
            isPending={isPending}
            onClick={handleJoinClick}
            className="flex-1 h-10 sm:h-15 text-sm sm:text-xl"
          />
        )}
      </div>
    </div>
  );
}
