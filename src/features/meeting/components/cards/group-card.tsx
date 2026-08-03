'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MeetingWithHost } from '@/api/data-contracts';
import { UtilityButton } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress/progress-bar';
import { Tag } from '@/components/ui/tag/tag';
import { StatusLabel } from '@/components/ui/label/status-label';
import AlarmTag from '@/components/ui/tag/alarm-tag';
import { FormattedDate } from '@/components/ui/date/formatted-date';
import { MeetingJoinButton } from '../meeting-join-button';
import { useMeetingCardActions } from '../../hooks/use-meeting-card-actions';

export interface GroupCardProps {
  meeting: MeetingWithHost;
}

export function GroupCard({ meeting }: GroupCardProps) {
  const {
    isHost,
    isJoined,
    isSaved,
    isFull,
    isCanceled,
    isConfirmed,
    isRegistrationClosed,
    participantCount,
    capacity,
    deadlineTag,
    imageUrl,
    handleSaveClick,
    handleJoinClick,
    handleCardClick,
    isJoinPending,
  } = useMeetingCardActions(meeting);

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'bg-white relative overflow-hidden flex cursor-pointer transition-shadow hover:shadow-md border border-gray-100',
        'flex-col w-full rounded-3xl pb-5',
        'sm:flex-row sm:p-6 sm:gap-5 sm:items-stretch',
      )}
    >
      {/* 썸네일 영역 */}
      <div className="relative shrink-0 w-full h-39 sm:w-42.5 sm:h-42.5 sm:rounded-3xl overflow-hidden bg-gray-100 rounded-t-3xl">
        <Image
          src={imageUrl}
          alt={meeting.name ?? '모임 이미지'}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover"
        />
        {isRegistrationClosed && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-extrabold text-2xl tracking-tight">
              모집 마감
            </span>
          </div>
        )}

        {/* 모바일 아이콘 (마감 여부에 따라 하트 또는 박수) */}
        <div className="absolute top-4 right-4 sm:hidden z-10">
          <UtilityButton onClick={handleSaveClick} isActive={isSaved} />
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 px-5 mt-4 sm:px-0 sm:mt-0 justify-between min-w-0">
        <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
          {/* 제목 영역 */}
          <div className="flex items-center gap-2 mt-1 sm:mt-0 min-w-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-[-0.4px] line-clamp-1 break-all flex-1 min-w-0">
              {meeting.name}
            </h3>
            {isConfirmed && (
              <StatusLabel
                size="lg"
                label="개설확정"
                className="scale-90 origin-left shrink-0"
              />
            )}
          </div>

          {/* 서브타이틀 (위치, 카테고리) */}
          <div className="flex items-center gap-1.5 text-sm sm:text-base text-gray-500 font-medium min-w-0">
            <span className="truncate">{meeting.region}</span>
            <span className="shrink-0">·</span>
            <span className="shrink-0">{meeting.type}</span>
          </div>

          {/* 태그 영역 (FormattedDate 활용으로 하이드레이션 오류 완전 해결) */}
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="lg">
              <FormattedDate value={meeting.dateTime} mode="date" />
            </Tag>
            <Tag size="lg">
              <FormattedDate value={meeting.dateTime} mode="time" />
            </Tag>
            {deadlineTag && <AlarmTag>{deadlineTag}</AlarmTag>}
          </div>
        </div>

        {/* 하단 프로그레스 바 및 액션 버튼 영역 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-auto relative w-full">
          {/* 데스크톱 상단 아이콘 */}
          <div className="hidden sm:block absolute -top-32 right-2 z-10">
            <UtilityButton onClick={handleSaveClick} isActive={isSaved} />
          </div>

          <div className="w-full sm:flex-1 sm:max-w-[256px] sm:min-w-30">
            <ProgressBar
              current={participantCount}
              total={capacity}
              showIcon={true}
              showCounter={true}
            />
          </div>

          <MeetingJoinButton
            isCanceled={isCanceled}
            isHost={isHost}
            isJoined={isJoined}
            isFull={isFull}
            isRegistrationClosed={isRegistrationClosed}
            isPending={isJoinPending}
            onClick={handleJoinClick}
            size="md"
            mode="list"
            className="w-full sm:w-auto px-6 h-12 shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
