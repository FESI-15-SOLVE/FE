import { MeetingWithHost, JoinedMeeting } from '@/api/data-contracts';

export type MeetingBadgeStatus = 'confirmed' | 'pending' | 'completed' | 'upcoming';
export type MeetingActionStatus = 'reserved' | 'completed' | 'canceled';

/**
 * 1. 개설 확정 여부 (confirmedAt 존재 여부)
 */
export function isMeetingConfirmed(
  meeting: Pick<MeetingWithHost, 'confirmedAt'>,
): boolean {
  return Boolean(meeting.confirmedAt);
}

/**
 * 2. 모임 취소 여부 (canceledAt 존재 여부)
 */
export function isMeetingCanceled(
  meeting: Pick<MeetingWithHost, 'canceledAt'>,
): boolean {
  return Boolean(meeting.canceledAt);
}

/**
 * 3. 모집 마감 또는 완료 여부 (마감 딤 처리 및 마감 아이콘 기준)
 */
export function isMeetingClosed(
  meeting: Pick<
    MeetingWithHost,
    'participantCount' | 'capacity' | 'isCompleted' | 'canceledAt'
  >,
): boolean {
  return (
    Boolean(meeting.isCompleted) ||
    Boolean(meeting.canceledAt) ||
    meeting.participantCount >= meeting.capacity
  );
}

/**
 * 4. DetailCard용 뱃지 상태 목록 추론 (개설확정/대기 + 이용완료/예정)
 */
export function getMeetingBadgeStatuses(
  meeting: Pick<MeetingWithHost, 'confirmedAt' | 'isCompleted'>,
): MeetingBadgeStatus[] {
  const isConfirmed = isMeetingConfirmed(meeting);
  const isCompleted = Boolean(meeting.isCompleted);

  return [
    isConfirmed ? 'confirmed' : 'pending',
    isCompleted ? 'completed' : 'upcoming',
  ];
}

/**
 * 5. DetailCard용 우하단 액션 버튼 상태 추론
 * - canceled: 모임 취소됨
 * - completed: 이용 완료됨 (리뷰 작성 대상)
 * - reserved: 예약됨 (예약 취소 대상)
 */
export function getMeetingActionStatus(
  meeting: Partial<JoinedMeeting> & Pick<MeetingWithHost, 'canceledAt' | 'isCompleted'>,
): MeetingActionStatus {
  if (meeting.canceledAt) {
    return 'canceled';
  }
  if (meeting.isCompleted) {
    return 'completed';
  }
  return 'reserved';
}
