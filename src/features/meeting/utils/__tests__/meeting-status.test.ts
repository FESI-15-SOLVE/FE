import { describe, it, expect } from 'vitest';
import { getMeetingDerivedState } from '../meeting-status';
import { createMockMeeting } from '@/__mocks__/fixtures';

describe('getMeetingDerivedState', () => {
  const baseMeeting = createMockMeeting({
    id: 101,
    capacity: 5,
    participantCount: 3,
    hostId: 10,
    createdBy: 10,
    dateTime: '2026-12-31T18:00:00.000Z',
    registrationEnd: '2026-12-30T18:00:00.000Z',
    isJoined: false,
    isFavorited: false,
    canceledAt: null,
    isCompleted: false,
    confirmedAt: null,
  });

  it('currentUserId가 hostId와 일치하면 isHost가 true여야 한다', () => {
    const state = getMeetingDerivedState(baseMeeting, 10);
    expect(state.isHost).toBe(true);

    const nonHostState = getMeetingDerivedState(baseMeeting, 99);
    expect(nonHostState.isHost).toBe(false);
  });

  it('정원이 가득 찬 경우(participantCount >= capacity) isFull과 isRegistrationClosed가 true여야 한다', () => {
    const fullMeeting = createMockMeeting({ ...baseMeeting, participantCount: 5, capacity: 5 });
    const state = getMeetingDerivedState(fullMeeting);
    expect(state.isFull).toBe(true);
    expect(state.isRegistrationClosed).toBe(true);
  });

  it('마감일이 지난 경우 isDeadlinePassed와 isRegistrationClosed가 true여야 한다', () => {
    const expiredMeeting = createMockMeeting({
      ...baseMeeting,
      registrationEnd: '2020-01-01T00:00:00.000Z',
    });
    const state = getMeetingDerivedState(expiredMeeting);
    expect(state.isDeadlinePassed).toBe(true);
    expect(state.isRegistrationClosed).toBe(true);
  });

  it('모임이 취소(canceledAt)되었거나 완료(isCompleted)된 경우 isRegistrationClosed가 true여야 한다', () => {
    const canceledMeeting = createMockMeeting({ ...baseMeeting, canceledAt: '2026-08-01T00:00:00.000Z' });
    expect(getMeetingDerivedState(canceledMeeting).isRegistrationClosed).toBe(true);

    const completedMeeting = createMockMeeting({ ...baseMeeting, isCompleted: true });
    expect(getMeetingDerivedState(completedMeeting).isRegistrationClosed).toBe(true);
  });
});
