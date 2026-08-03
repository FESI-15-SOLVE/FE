'use client';

import ImageNext from 'next/image';
import { MeetingWithHost } from '@/api/data-contracts';
import { InformationCard } from '../cards/information-card';
import { PersonnelContainer } from '../cards/personnel-container';
import { FALLBACK_MEETING_IMAGE } from '../../utils/meeting-mapper';
import { getMeetingDerivedState } from '../../utils/meeting-status';
import { useAuthStore } from '@/providers/auth-provider';

export interface MeetingDetailHeaderProps {
  meeting: MeetingWithHost;
}

export function MeetingDetailHeader({ meeting }: MeetingDetailHeaderProps) {
  // InformationCard 내부에서 useMeetingCardActions가 처리하므로
  // 여기서는 PersonnelContainer에 필요한 값만 추출한다.
  const user = useAuthStore((s) => s.user);
  const { isConfirmed, participantCount, capacity } = getMeetingDerivedState(
    meeting,
    user?.id,
  );

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
      {/* 1. 좌측 메인 모임 배너 이미지 */}
      <div className="w-full lg:w-1/2 min-h-75 lg:min-h-0 relative rounded-3xl overflow-hidden border border-gray-100 bg-neutral-100 shrink-0">
        <ImageNext
          src={meeting.image || FALLBACK_MEETING_IMAGE}
          alt={meeting.name ?? '모임 대표 이미지'}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* 2. 우측 스택: InformationCard + PersonnelContainer */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between gap-5">
        {/* 모임 기본 정보 카드 (InformationCard) — 찜/참여 핸들러 내부 처리 */}
        <InformationCard meeting={meeting} />

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
