'use client';

import ImageNext from 'next/image';
import { MeetingWithHost } from '@/api/data-contracts';
import { InformationCard } from '../cards/information-card';
import { PersonnelContainer } from '../cards/personnel-container';
import { useToggleFavorite } from '../../hooks/use-toggle-favorite';
import { useJoinMeeting } from '../../hooks/use-join-meeting';
import {
  formatMeetingDate,
  formatMeetingTime,
  formatDeadlineTag,
} from '../../utils/date-formatter';
import { FALLBACK_MEETING_IMAGE } from '../../utils/meeting-mapper';
import { useAuthStore } from '@/providers/auth-provider';
import { useAuthAction } from '@/hooks/use-auth-action';
import { getMeetingDerivedState } from '../../utils/meeting-status';
import { useShareMeeting } from '../../hooks/use-share-meeting';

export interface MeetingDetailHeaderProps {
  meeting: MeetingWithHost;
}

export function MeetingDetailHeader({ meeting }: MeetingDetailHeaderProps) {
  const user = useAuthStore((s) => s.user);
  const toggleFavoriteMutation = useToggleFavorite();
  const joinMeetingMutation = useJoinMeeting();
  const { shareMeeting } = useShareMeeting();
  const withAuth = useAuthAction();

  const formattedDate = formatMeetingDate(meeting.dateTime);
  const formattedTime = formatMeetingTime(meeting.dateTime);
  const deadlineTag = formatDeadlineTag(meeting.registrationEnd);

  // 공통 상태 유틸리티를 사용하여 모임의 모든 파생 상태를 한 번에 계산
  const {
    isHost,
    isSaved,
    isJoined,
    isFull,
    isCanceled,
    isConfirmed,
    isRegistrationClosed,
    participantCount,
    capacity,
  } = getMeetingDerivedState(meeting, user?.id);

  const handleSaveToggle = () => {
    withAuth(() => {
      toggleFavoriteMutation.mutate({
        meetingId: meeting.id,
        isSaved,
      });
    })();
  };

  const handleJoinToggle = () => {
    if (isHost) {
      shareMeeting(meeting.id);
      return;
    }
    withAuth(() => {
      joinMeetingMutation.mutate({
        meetingId: meeting.id,
        isJoined,
      });
    })();
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
      {/* 1. 좌측 메인 모임 배너 이미지 */}
      <div className="w-full lg:w-1/2 min-h-75 lg:min-h-0 relative rounded-3xl overflow-hidden border border-gray-100 bg-neutral-100 shrink-0">
        <ImageNext
          src={meeting.image || FALLBACK_MEETING_IMAGE}
          alt={meeting.name || '모임 대표 이미지'}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 2. 우측 스택: InformationCard + PersonnelContainer */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between gap-5">
        {/* 모임 기본 정보 카드 (InformationCard) */}
        <InformationCard
          meeting={{
            id: String(meeting.id),
            title: meeting.name,
            date: formattedDate,
            time: formattedTime,
            location: meeting.address || meeting.region,
            category: meeting.type,
            deadlineTag: deadlineTag,
            isSaved: isSaved,
          }}
          isHost={isHost}
          isJoined={isJoined}
          isFull={isFull}
          isRegistrationClosed={isRegistrationClosed}
          isCanceled={isCanceled}
          isPending={joinMeetingMutation.isPending}
          onSaveClick={handleSaveToggle}
          onJoinClick={handleJoinToggle}
        />

        {/* 모집 현황 및 개설확정 뱃지 카드 (PersonnelContainer) */}
        <PersonnelContainer
          meetingId={String(meeting.id)}
          currentParticipant={participantCount}
          minParticipant={5}
          maxParticipant={capacity}
          isConfirmed={isConfirmed}
        />
      </div>
    </div>
  );
}
