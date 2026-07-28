import { MeetingWithHost, JoinedMeeting } from '@/api/data-contracts';

export type MeetingBadgeStatus =
  'confirmed' | 'pending' | 'completed' | 'upcoming';
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
  meeting: Partial<JoinedMeeting> &
    Pick<MeetingWithHost, 'canceledAt' | 'isCompleted'>,
): MeetingActionStatus {
  if (meeting.canceledAt) {
    return 'canceled';
  }
  if (meeting.isCompleted) {
    return 'completed';
  }
  return 'reserved';
}

/**
 * 6. 모임의 파생 상태(마감, 정원 초과, 취소, 방장 여부 등)를 모두 계산하여 반환하는 순수 함수
 * 컴포넌트나 매퍼 함수에서 공통으로 재사용됩니다.
 */
export function getMeetingDerivedState(
  meeting: MeetingWithHost,
  currentUserId?: number | string | null,
) {
  const isHost = Boolean(
    currentUserId &&
    (meeting.hostId === Number(currentUserId) ||
      meeting.createdBy === Number(currentUserId)),
  );

  const isJoined = Boolean(meeting.isJoined);
  const isSaved = Boolean(meeting.isFavorited);
  const isCanceled = Boolean(meeting.canceledAt);
  const isCompleted = Boolean(meeting.isCompleted);
  const isConfirmed = isMeetingConfirmed(meeting);

  const participantCount = meeting.participantCount || 0;
  const capacity = meeting.capacity || 1;
  const isFull = participantCount >= capacity;

  // 마감일이 지났는지 여부
  const isDeadlinePassed = meeting.registrationEnd
    ? new Date(meeting.registrationEnd) < new Date()
    : false; // 마감일이 아예 null로 설정된 경우 무기한(false)으로 간주

  // 모임 모집 마감 여부 (취소됨 || 정원초과 || 종료됨 || 마감기한 지남)
  const isRegistrationClosed =
    isCanceled || isFull || isCompleted || isDeadlinePassed;

  return {
    isHost,
    isJoined,
    isSaved,
    isCanceled,
    isCompleted,
    isConfirmed,
    isFull,
    isDeadlinePassed,
    isRegistrationClosed,
    participantCount,
    capacity,
  };
}
