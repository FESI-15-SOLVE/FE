'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MeetingWithHost } from '@/api/data-contracts';
import { useAuthStore } from '@/providers/auth-provider';
import { useAuthAction } from '@/hooks/use-auth-action';
import { useToggleFavorite } from './use-toggle-favorite';
import { useJoinMeeting } from './use-join-meeting';
import { useShareMeeting } from './use-share-meeting';
import { getMeetingDerivedState } from '../utils/meeting-status';
import {
  formatMeetingDate,
  formatMeetingTime,
  formatDeadlineTag,
} from '../utils/date-formatter';
import { FALLBACK_MEETING_IMAGE } from '../utils/meeting-mapper';
import { ROUTES } from '@/constants/routes';

/**
 * GroupCard / InformationCard 에서 공통으로 사용하는 찜하기·참여하기 핸들러와
 * 파생 상태(isHost, isJoined …)를 하나로 묶은 훅.
 *
 * 두 카드가 meeting feature 전용이므로 useAuthStore 의존을 내부에서 가진다.
 */
export interface UseMeetingCardActionsOptions {
  defaultIsJoined?: boolean;
}

export function useMeetingCardActions(
  meeting: MeetingWithHost,
  options?: UseMeetingCardActionsOptions,
) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const withAuth = useAuthAction();
  const toggleFavoriteMutation = useToggleFavorite();
  const joinMeetingMutation = useJoinMeeting();
  const { shareMeeting } = useShareMeeting();

  const state = getMeetingDerivedState(meeting, user?.id);
  const isJoined = options?.defaultIsJoined ?? state.isJoined;

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    withAuth(() => {
      toggleFavoriteMutation.mutate({
        meetingId: meeting.id,
        isSaved: state.isSaved,
      });
    })();
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 취소되었거나 이미 종료된 모임은 액션 차단
    if (state.isCanceled || state.isCompleted) return;

    // 호스트인 경우 공유하기 실행
    if (state.isHost) {
      shareMeeting(meeting.id);
      return;
    }

    // 이미 참여한 사용자(또는 내 모임 카드 기본값)는 마감 여부와 무관하게 취소 가능
    if (isJoined) {
      withAuth(() => {
        joinMeetingMutation.mutate({
          meetingId: meeting.id,
          isJoined: true,
        });
      })();
      return;
    }

    // 마감된 모임인 경우 신규 참여 차단
    if (state.isRegistrationClosed) return;

    // 신규 참여 신청
    withAuth(() => {
      joinMeetingMutation.mutate({
        meetingId: meeting.id,
        isJoined: false,
      });
    })();
  };

  const handleCardClick = () => {
    router.push(ROUTES.MEETINGS.DETAIL(meeting.id));
  };

  return {
    // 파생 상태
    isHost: state.isHost,
    isJoined,
    isSaved: state.isSaved,
    isFull: state.isFull,
    isCanceled: state.isCanceled,
    isConfirmed: state.isConfirmed,
    isCompleted: state.isCompleted,
    isRegistrationClosed: state.isRegistrationClosed,
    participantCount: state.participantCount,
    capacity: state.capacity,
    // 포맷된 표시 데이터
    formattedDate: formatMeetingDate(meeting.dateTime),
    formattedTime: formatMeetingTime(meeting.dateTime),
    deadlineTag: formatDeadlineTag(meeting.registrationEnd),
    imageUrl: meeting.image ?? FALLBACK_MEETING_IMAGE,
    // 핸들러
    handleSaveClick,
    handleJoinClick,
    handleCardClick,
    // mutation 상태
    isJoinPending:
      joinMeetingMutation.isPending &&
      joinMeetingMutation.variables?.meetingId === meeting.id,
  };
}
