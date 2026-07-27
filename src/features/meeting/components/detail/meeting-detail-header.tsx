'use client';

import ImageNext from 'next/image';
import { MeetingWithHost } from '@/api/data-contracts';
import { InformationCard } from '../cards/information-card';
import { PersonnelContainer } from '../cards/personnel-container';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface MeetingDetailHeaderProps {
  meeting: MeetingWithHost;
  currentUserId?: number;
  onSaveToggle?: () => void;
}

export function MeetingDetailHeader({
  meeting,
  currentUserId,
  onSaveToggle,
}: MeetingDetailHeaderProps) {
  const formattedDate = meeting.dateTime
    ? format(new Date(meeting.dateTime), 'yyyy년 MM월 dd일 (EEE)', {
        locale: ko,
      })
    : '날짜 미정';

  const formattedTime = meeting.dateTime
    ? format(new Date(meeting.dateTime), 'HH:mm')
    : '시간 미정';

  const isHost = Boolean(
    currentUserId &&
    (meeting.hostId === currentUserId || meeting.createdBy === currentUserId),
  );

  const fallbackImage =
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846';

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
      {/* 1. 좌측 메인 모임 배너 이미지 (우측 컨테이너 높이와 1:1 자동으로 맞춰짐) */}
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
            deadlineTag: '마감 임박',
            isSaved: Boolean(meeting.isFavorited),
          }}
          isHost={isHost}
          onSaveClick={onSaveToggle}
        />

        {/* 모집 현황 및 개설확정 뱃지 카드 (PersonnelContainer) */}
        <PersonnelContainer
          currentParticipant={meeting.participantCount}
          minParticipant={5}
          maxParticipant={meeting.capacity}
          isConfirmed={Boolean(meeting.confirmedAt)}
        />
      </div>
    </div>
  );
}
