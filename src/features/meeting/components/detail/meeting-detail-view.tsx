'use client';

import { useQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';
import { MeetingDetailHeader } from './meeting-detail-header';
import { MeetingDescription } from './meeting-description';
import { MeetingLocationMap } from './meeting-location-map';
import { MeetingReviews } from './meeting-reviews';

export interface MeetingDetailViewProps {
  meetingId: string;
}

export function MeetingDetailView({ meetingId }: MeetingDetailViewProps) {
  const {
    data: meeting,
    isLoading,
    isError,
  } = useQuery(meetingQueries.detailQuery(meetingId));

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-neutral-400 animate-pulse">
          모임 정보를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center py-20 text-neutral-500">
        <p className="text-lg font-semibold">모임 정보를 찾을 수 없습니다.</p>
        <p className="text-xs text-neutral-400 mt-1">
          존재하지 않거나 삭제된 모임입니다.
        </p>
      </div>
    );
  }

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
