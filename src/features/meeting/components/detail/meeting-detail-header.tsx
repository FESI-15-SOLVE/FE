'use client';

import ImageNext from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { MeetingWithHost } from '@/api/data-contracts';
import { InformationCard } from '../cards/information-card';
import { PersonnelContainer } from '../cards/personnel-container';
import { meetingQueries } from '../../queries/meeting-query';
import { useToggleFavorite } from '../../hooks/use-toggle-favorite';
import {
  formatMeetingDate,
  formatMeetingTime,
  formatDeadlineTag,
} from '../../utils/date-formatter';
import { isMeetingConfirmed } from '../../utils/meeting-status';

export interface MeetingDetailHeaderProps {
  meeting: MeetingWithHost;
  currentUserId?: number;
}

export function MeetingDetailHeader({
  meeting,
  currentUserId,
}: MeetingDetailHeaderProps) {
  const toggleFavoriteMutation = useToggleFavorite();

  // 참가자 목록 조회 API
  const { data: participantsData } = useQuery(
    meetingQueries.participantsQuery(String(meeting.id)),
  );

  const participantImages =
    participantsData?.data
      ?.map((p) => p.user?.image)
      .filter((img): img is string => Boolean(img)) || [];

  const formattedDate = formatMeetingDate(meeting.dateTime);
  const formattedTime = formatMeetingTime(meeting.dateTime);
  const deadlineTag = formatDeadlineTag(meeting.registrationEnd);

  const isHost = Boolean(
    currentUserId &&
      (meeting.hostId === currentUserId || meeting.createdBy === currentUserId),
  );

  const isSaved = Boolean(meeting.isFavorited);

  const handleSaveToggle = () => {
    toggleFavoriteMutation.mutate({
      meetingId: meeting.id,
      isSaved,
    });
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846';

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
      {/* 1. 좌측 메인 모임 배너 이미지 */}
      <div className="w-full lg:w-1/2 min-h-75 lg:min-h-0 relative rounded-3xl overflow-hidden border border-gray-100 bg-neutral-100 shrink-0">
        <ImageNext
          src={meeting.image || fallbackImage}
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
          onSaveClick={handleSaveToggle}
        />

        {/* 모집 현황 및 개설확정 뱃지 카드 (PersonnelContainer) */}
        <PersonnelContainer
          currentParticipant={meeting.participantCount}
          minParticipant={5}
          maxParticipant={meeting.capacity}
          participantImages={participantImages}
          isConfirmed={isMeetingConfirmed(meeting)}
        />
      </div>
    </div>
  );
}
