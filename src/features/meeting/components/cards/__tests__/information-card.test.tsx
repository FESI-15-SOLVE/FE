import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InformationCard } from '../information-card';
import * as useMeetingCardActionsModule from '../../../hooks/use-meeting-card-actions';
import { MeetingWithHost } from '@/api/data-contracts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// FormattedDate dynamic import mock for vitest
vi.mock('@/components/ui/date/formatted-date', () => ({
  FormattedDate: ({ value, mode }: { value?: string; mode?: string }) => {
    if (mode === 'time') return <span>17:30</span>;
    return <span>1월 7일</span>;
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  function TestWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return TestWrapper;
};

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
    render(<InformationCard meeting={mockMeeting} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('작은 독서 습관 만들기')).toBeInTheDocument();
    expect(screen.getByText('1월 7일')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
    expect(screen.getByText('중구 · 취미/여가')).toBeInTheDocument();
    expect(screen.getByText('오늘 21시 마감')).toBeInTheDocument();
  });

  it('참여하기 클릭 시 handleJoinClick이 호출되어야 한다', () => {
    render(<InformationCard meeting={mockMeeting} />, {
      wrapper: createWrapper(),
    });

    fireEvent.click(screen.getByRole('button', { name: '참여하기' }));

    expect(mockHandleJoinClick).toHaveBeenCalledTimes(1);
  });
});
