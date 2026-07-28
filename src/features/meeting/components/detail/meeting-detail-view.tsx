'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { MeetingDetailHeader } from './meeting-detail-header';
import { MeetingDescription } from './meeting-description';
import { MeetingLocationMap } from './meeting-location-map';
import { MeetingReviews } from './meeting-reviews';

export interface MeetingDetailViewProps {
  meetingId: string;
}

export function MeetingDetailView({ meetingId }: MeetingDetailViewProps) {
  const { data: meeting } = useSuspenseQuery(
    meetingQueries.detailQuery(meetingId),
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      {/* 1. 상단 히어로 헤더 (대표 이미지 & InformationCard + PersonnelContainer) */}
      <MeetingDetailHeader meeting={meeting} />

      {/* 2. 메인 상세 정보 영역 (모임 설명, 장소 지도, 리뷰) */}
      <div className="space-y-8 w-full">
        <MeetingDescription meeting={meeting} />
        <MeetingLocationMap meeting={meeting} />
        <MeetingReviews />
      </div>
    </div>
  );
}

