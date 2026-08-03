import { MeetingWithHost } from '@/api/data-contracts';

/**
 * 모임의 모든 파생 상태(마감, 정원 초과, 취소, 방장 여부 등)를
 * 순수 함수로 일괄 계산하는 중앙집중 상태 헬퍼.
 */
export function getMeetingDerivedState(
  meeting: MeetingWithHost,
  currentUserId?: number | string | null,
) {
  const isHost = !!(
    currentUserId &&
    (meeting.hostId === Number(currentUserId) ||
      meeting.createdBy === Number(currentUserId))
  );

  const isJoined = !!meeting.isJoined;
  const isSaved = !!meeting.isFavorited;
  const isCanceled = !!meeting.canceledAt;
  const isCompleted = !!meeting.isCompleted;
  const isConfirmed = !!meeting.confirmedAt;

  const participantCount = meeting.participantCount || 0;
  const capacity = meeting.capacity || 1;
  const isFull = participantCount >= capacity;

  // 마감일이 지났는지 여부
  const isDeadlinePassed = meeting.registrationEnd
    ? new Date(meeting.registrationEnd) < new Date()
    : false;

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
