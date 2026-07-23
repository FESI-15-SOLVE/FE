import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InformationCard } from '../information-card';

const mockMeeting = {
  id: '1',
  title: '작은 독서 습관 만들기',
  date: '1월 7일',
  time: '17:30',
  location: '중구',
  category: '취미/여가',
  deadlineTag: '오늘 21시 마감',
  isSaved: false,
};

describe('InformationCard 컴포넌트', () => {
  it('모임 세부 정보를 올바르게 렌더링해야 한다', () => {
    render(<InformationCard meeting={mockMeeting} />);
    
    expect(screen.getByText('작은 독서 습관 만들기')).toBeInTheDocument();
    expect(screen.getByText('1월 7일')).toBeInTheDocument();
    expect(screen.getByText('17:30')).toBeInTheDocument();
    expect(screen.getByText('중구 · 취미/여가')).toBeInTheDocument();
    expect(screen.getByText('오늘 21시 마감')).toBeInTheDocument();
  });

  it('이벤트 버블링 없이 클릭 이벤트를 올바르게 처리해야 한다', () => {
    const handleCardClick = vi.fn();
    const handleJoinClick = vi.fn();

    render(
      <InformationCard
        meeting={mockMeeting}
        onClick={handleCardClick}
        onJoinClick={handleJoinClick}
      />
    );

    fireEvent.click(screen.getByText('참여하기'));
    
    expect(handleJoinClick).toHaveBeenCalledTimes(1);
    expect(handleCardClick).not.toHaveBeenCalled();
  });
});
