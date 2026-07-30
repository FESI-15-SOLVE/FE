import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GroupCard } from '../group-card';
import * as useMeetingCardActionsModule from '../../../hooks/use-meeting-card-actions';
import { MeetingWithHost } from '@/api/data-contracts';

const mockMeeting = {
  id: 1,
  name: '달램핏 오피스 스트레칭',
  type: '운동/건강',
  region: '을지로 3가',
  dateTime: '2026-01-07T17:30:00.000Z',
  registrationEnd: '2026-01-06T21:00:00.000Z',
  capacity: 20,
  participantCount: 12,
  image: 'https://via.placeholder.com/150',
} as unknown as MeetingWithHost;

const mockActions = {
  isHost: false,
  isJoined: false,
  isSaved: false,
  isFull: false,
  isCanceled: false,
  isConfirmed: false,
  isRegistrationClosed: false,
  participantCount: 12,
  capacity: 20,
  formattedDate: '1월 7일',
  formattedTime: '17:30',
  deadlineTag: '오늘 21시 마감',
  imageUrl: 'https://via.placeholder.com/150',
  handleSaveClick: vi.fn(),
  handleJoinClick: vi.fn(),
  handleCardClick: vi.fn(),
  isJoinPending: false,
};

beforeEach(() => {
  vi.spyOn(
    useMeetingCardActionsModule,
    'useMeetingCardActions',
  ).mockReturnValue(mockActions);
});

describe('GroupCard 컴포넌트', () => {
  it('모임의 세부 정보를 올바르게 렌더링해야 합니다.', () => {
    render(<GroupCard meeting={mockMeeting} />);
    expect(screen.getByText('달램핏 오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText(/을지로 3가/)).toBeInTheDocument();
    expect(screen.getByText(/운동\/건강/)).toBeInTheDocument();
    expect(screen.getByText('오늘 21시 마감')).toBeInTheDocument();
  });

  it('마감 상태일 경우 모집 마감 오버레이가 렌더링되어야 합니다.', () => {
    vi.spyOn(
      useMeetingCardActionsModule,
      'useMeetingCardActions',
    ).mockReturnValue({
      ...mockActions,
      isRegistrationClosed: true,
    });
    render(<GroupCard meeting={mockMeeting} />);
    expect(screen.getByText('모집 마감')).toBeInTheDocument();
  });
});
