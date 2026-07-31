import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InformationCard } from '../information-card';
import * as useMeetingCardActionsModule from '../../../hooks/use-meeting-card-actions';
import { MeetingWithHost } from '@/api/data-contracts';

const mockMeeting = {
  id: 1,
  teamId: 'team-1',
  name: '작은 독서 습관 만들기',
  type: '취미/여가',
  region: '중구',
  address: '중구',
  dateTime: '2026-01-07T17:30:00.000Z',
  registrationEnd: '2026-01-06T21:00:00.000Z',
  capacity: 20,
  participantCount: 5,
  image: 'https://via.placeholder.com/150',
} as unknown as MeetingWithHost;

const mockHandleSaveClick = vi.fn();
const mockHandleJoinClick = vi.fn();

const mockActions = {
  isHost: false,
  isJoined: false,
  isSaved: false,
  isFull: false,
  isCanceled: false,
  isConfirmed: false,
  isRegistrationClosed: false,
  participantCount: 5,
  capacity: 20,
  formattedDate: '1월 7일',
  formattedTime: '17:30',
  deadlineTag: '오늘 21시 마감',
  imageUrl: 'https://via.placeholder.com/150',
  handleSaveClick: mockHandleSaveClick,
  handleJoinClick: mockHandleJoinClick,
  handleCardClick: vi.fn(),
  isJoinPending: false,
};

beforeEach(() => {
  vi.spyOn(
    useMeetingCardActionsModule,
    'useMeetingCardActions',
  ).mockReturnValue(mockActions);
});

describe('InformationCard 컴포넌트', () => {
  it('모임 세부 정보를 올바르게 렌더링해야 한다', () => {
    render(<InformationCard meeting={mockMeeting} />);

    expect(screen.getByText('작은 독서 습관 만들기')).toBeInTheDocument();
    expect(screen.getByText('1월 7일')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
    expect(screen.getByText('중구 · 취미/여가')).toBeInTheDocument();
    expect(screen.getByText('오늘 21시 마감')).toBeInTheDocument();
  });

  it('참여하기 클릭 시 handleJoinClick이 호출되어야 한다', () => {
    render(<InformationCard meeting={mockMeeting} />);

    fireEvent.click(screen.getByRole('button', { name: '참여하기' }));

    expect(mockHandleJoinClick).toHaveBeenCalledTimes(1);
  });
});
