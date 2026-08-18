import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MeetingJoinButton } from '../meeting-join-button';

describe('MeetingJoinButton 컴포넌트', () => {
  it('참여 가능 상태(joinable)일 때 "참여하기" 버튼이 활성화되어 렌더링된다', async () => {
    const handleClick = vi.fn();
    render(
      <MeetingJoinButton
        isCanceled={false}
        isJoined={false}
        isFull={false}
        isRegistrationClosed={false}
        isPending={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: '참여하기' });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('이미 참여 중(isJoined=true)인 경우 "참여 취소하기" 버튼이 표시된다', async () => {
    const handleClick = vi.fn();
    render(
      <MeetingJoinButton
        isCanceled={false}
        isJoined={true}
        isFull={false}
        isRegistrationClosed={false}
        isPending={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: '참여 취소하기' });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('호스트(isHost=true)인 경우 "공유하기" 버튼이 표시된다', () => {
    render(
      <MeetingJoinButton
        isCanceled={false}
        isHost={true}
        isJoined={false}
        isFull={false}
        isRegistrationClosed={false}
        isPending={false}
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '공유하기' })).toBeInTheDocument();
  });

  it('정원 마감(isFull=true) 또는 모집 마감(isRegistrationClosed=true) 시 비활성화된다', () => {
    const { rerender } = render(
      <MeetingJoinButton
        isCanceled={false}
        isJoined={false}
        isFull={true}
        isRegistrationClosed={false}
        isPending={false}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: '정원이 마감되었습니다' })).toBeDisabled();

    rerender(
      <MeetingJoinButton
        isCanceled={false}
        isJoined={false}
        isFull={false}
        isRegistrationClosed={true}
        isPending={false}
        onClick={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: '모집 기한이 종료되었습니다' })).toBeDisabled();
  });
});
