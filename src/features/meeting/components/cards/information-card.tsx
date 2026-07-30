'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/tag/tag';
import { UtilityButton } from '@/components/ui/button';
import IconCrown from '@/assets/icons/crown.svg';
import IconMeatballs from '@/assets/icons/meetballs.svg';
import AlarmTag from '@/components/ui/tag/alarm-tag';
import { MeetingJoinButton } from '../meeting-join-button';
import { MeetingWithHost } from '@/api/data-contracts';
import { useMeetingCardActions } from '../../hooks/use-meeting-card-actions';

export interface InformationCardProps {
  meeting: MeetingWithHost;
  onOptionsClick?: (e: React.MouseEvent) => void;
}

export function InformationCard({ meeting, onOptionsClick }: InformationCardProps) {
  const {
    isHost,
    isJoined,
    isSaved,
    isFull,
    isCanceled,
    isRegistrationClosed,
    formattedDate,
    formattedTime,
    deadlineTag,
    handleSaveClick,
    handleJoinClick,
    isJoinPending,
  } = useMeetingCardActions(meeting);

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOptionsClick?.(e);
  };

  return (
    <div
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
          {deadlineTag && <AlarmTag>{deadlineTag}</AlarmTag>}
          <Tag>{formattedDate}</Tag>
          <Tag>{formattedTime}</Tag>
        </div>

        {/* 제목 및 방장 표시 */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <h3 className="text-lg sm:text-3xl font-semibold text-gray-800 tracking-[-0.36px] sm:tracking-[-0.84px]">
            {meeting.name}
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
            {meeting.address || meeting.region} · {meeting.type}
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
        <UtilityButton onClick={handleSaveClick} isActive={isSaved} />
        <MeetingJoinButton
          isCanceled={isCanceled}
          isHost={isHost}
          isJoined={isJoined}
          isFull={isFull}
          isRegistrationClosed={isRegistrationClosed}
          isPending={isJoinPending}
          onClick={handleJoinClick}
          className="flex-1 h-10 sm:h-15 text-sm sm:text-xl"
        />
      </div>
    </div>
  );
}
