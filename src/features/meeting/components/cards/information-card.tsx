'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@/components/ui/tag/tag';
import { UtilityButton } from '@/components/ui/button';
import IconCrown from '@/assets/icons/crown.svg';
import AlarmTag from '@/components/ui/tag/alarm-tag';
import { MeetingJoinButton } from '../meeting-join-button';
import { MeetingWithHost } from '@/api/data-contracts';
import { useMeetingCardActions } from '../../hooks/use-meeting-card-actions';
import { HostOptionsDropdown } from '../detail/host-options-dropdown';
import { EditMeetingModal } from '../detail/edit-meeting-modal';
import { CancelMeetingModal } from '../detail/cancel-meeting-modal';
import { useCancelMeeting } from '../../hooks/use-host-meeting-actions';

export interface InformationCardProps {
  meeting: MeetingWithHost;
}

export function InformationCard({ meeting }: InformationCardProps) {
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

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const { mutateAsync: cancelMeeting, isPending: isCancelPending } =
    useCancelMeeting();

  const handleCancelConfirm = async () => {
    await cancelMeeting({
      meetingId: Number(meeting.id),
    });
    setIsCancelOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          'bg-white relative overflow-hidden flex transition-shadow border border-gray-100',
          // 모바일 레이아웃
          'flex-col w-full p-5 px-6 rounded-2xl gap-2.5',
          // 데스크톱 레이아웃
          'sm:flex-col sm:p-8.5 sm:px-10 sm:rounded-3xl sm:gap-10',
        )}
      >
        {/* 콘텐츠 영역 */}
        <div className="flex flex-col flex-1 w-full sm:h-full gap-4 sm:gap-6">
          {/* 태그 영역 */}
          <div className="flex flex-wrap items-center gap-2 pr-10">
            {deadlineTag && <AlarmTag>{deadlineTag}</AlarmTag>}
            <Tag>{formattedDate}</Tag>
            <Tag>{formattedTime}</Tag>
          </div>

          {/* 제목 및 방장 표시 */}
          <div className="flex items-center gap-1 sm:gap-1.5 pr-10">
            <h3 className="text-lg sm:text-3xl font-semibold text-gray-800 tracking-[-0.36px] sm:tracking-[-0.84px]">
              {meeting.name}
            </h3>
            {isHost && (
              <div className="size-6 sm:size-8 text-yellow-500 flex items-center justify-center shrink-0">
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

        {/* 미트볼 아이콘 (주최자 전용 더보기 드롭다운 메뉴) */}
        {isHost && (
          <HostOptionsDropdown
            onEditClick={() => setIsEditOpen(true)}
            onCancelClick={() => setIsCancelOpen(true)}
          />
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

      {/* 주최자 모임 수정 모달 */}
      {isHost && isEditOpen && (
        <EditMeetingModal
          meeting={meeting}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {/* 주최자 모임 취소 확인 모달 */}
      {isHost && isCancelOpen && (
        <CancelMeetingModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={handleCancelConfirm}
          isPending={isCancelPending}
        />
      )}
    </>
  );
}
