import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DetailCard } from '../detail-card';

const mockMeeting = {
  id: '1',
  title: '달램핏 오피스 스트레칭',
  imageUrl: 'https://via.placeholder.com/150',
  location: '을지로 3가',
  date: '11월 17일',
  time: '17:30',
  participantCount: 20,
  maxParticipant: 20,
  isSaved: false,
};

describe('DetailCard', () => {
  it('모임의 세부 정보를 올바르게 렌더링해야 합니다.', () => {
    render(<DetailCard meeting={mockMeeting} />);
    expect(screen.getByText('달램핏 오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText('을지로 3가')).toBeInTheDocument();
    expect(screen.getByText('11월 17일')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
    expect(screen.getByText('20/20')).toBeInTheDocument();
  });

  it('배지 상태를 올바르게 렌더링해야 합니다.', () => {
    render(<DetailCard meeting={mockMeeting} badgeStatuses={['upcoming', 'pending']} />);
    expect(screen.getByText('이용예정')).toBeInTheDocument();
    expect(screen.getByText('개설대기')).toBeInTheDocument();
  });

  it('예약된 상태일 때 예약 취소하기 버튼을 렌더링하고 클릭 이벤트를 처리해야 합니다.', () => {
    const handleAction = vi.fn();
    render(<DetailCard meeting={mockMeeting} actionStatus="reserved" onActionClick={handleAction} />);
    const button = screen.getByText('예약 취소하기');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('완료된 상태일 때 리뷰 작성하기 버튼을 렌더링해야 합니다.', () => {
    render(<DetailCard meeting={mockMeeting} actionStatus="completed" />);
    const button = screen.getByText('리뷰 작성하기');
    expect(button).toBeInTheDocument();
  });
});
