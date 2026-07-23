import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GroupCard } from '../group-card';

const mockMeeting = {
  id: '1',
  title: '달램핏 오피스 스트레칭',
  imageUrl: 'https://via.placeholder.com/150',
  location: '을지로 3가',
  category: '운동/건강',
  date: '1월 7일',
  time: '17:30',
  deadlineTag: '오늘 21시 마감',
  participantCount: 12,
  maxParticipant: 20,
  isSaved: false,
};

describe('GroupCard', () => {
  it('모임의 세부 정보를 올바르게 렌더링해야 합니다.', () => {
    render(
      <GroupCard meeting={mockMeeting} isClosed={false} isConfirmed={true} />,
    );
    expect(screen.getByText('달램핏 오피스 스트레칭')).toBeInTheDocument();
    expect(screen.getByText(/을지로 3가/)).toBeInTheDocument();
    expect(screen.getByText(/운동\/건강/)).toBeInTheDocument();
    expect(screen.getByText('오늘 21시 마감')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('/20')).toBeInTheDocument();
  });

  it('마감 상태일 경우 모집 마감 오버레이가 렌더링되어야 합니다.', () => {
    render(<GroupCard meeting={mockMeeting} isClosed={true} />);
    expect(screen.getByText('모집 마감')).toBeInTheDocument();
  });

  it('오픈 상태일 때 참여하기 버튼을 클릭하면 핸들러가 호출되어야 합니다.', () => {
    const handleJoin = vi.fn();
    render(
      <GroupCard
        meeting={mockMeeting}
        isClosed={false}
        onJoinClick={handleJoin}
      />,
    );
    const button = screen.getByRole('button', { name: '참여하기' });
    fireEvent.click(button);
    expect(handleJoin).toHaveBeenCalledTimes(1);
  });
});
