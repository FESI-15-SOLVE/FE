'use client';

import { useQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { MeetingDetailHeader } from './meeting-detail-header';
import { MeetingPersonnelCard } from './meeting-personnel-card';
import { MeetingDescription } from './meeting-description';
import { MeetingLocationMap } from './meeting-location-map';
import { MeetingReviews } from './meeting-reviews';

export interface MeetingDetailViewProps {
  meetingId: string;
}

export function MeetingDetailView({ meetingId }: MeetingDetailViewProps) {
  const { data: meeting, isLoading, isError } = useQuery(
    meetingQueries.detailQuery(meetingId),
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-neutral-400 animate-pulse">
          모임 정보를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center py-20 text-neutral-500">
        <p className="text-lg font-semibold">모임 정보를 찾을 수 없습니다.</p>
        <p className="text-xs text-neutral-400 mt-1">
          존재하지 않거나 삭제된 모임입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      {/* 1. 상단 히어로 헤더 (대표 이미지 & 주요 정보) */}
      <MeetingDetailHeader meeting={meeting} />

      {/* 2. 메인 콘텐츠 Grid 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 좌측 메인 정보 (2열 넓이) */}
        <div className="lg:col-span-2 space-y-8">
          <MeetingDescription meeting={meeting} />
          <MeetingLocationMap meeting={meeting} />
          <MeetingReviews />
        </div>

        {/* 우측 모집 현황 및 참여 액션 카드 (1열 넓이 - Sticky) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <MeetingPersonnelCard meeting={meeting} />
        </div>
      </div>
    </div>
  );
}
