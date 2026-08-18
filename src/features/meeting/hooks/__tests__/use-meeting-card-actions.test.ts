import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMeetingCardActions } from '../use-meeting-card-actions';
import { createMockMeeting, createMockUser } from '@/__mocks__/fixtures';
import { AuthState } from '@/store/use-auth-store';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockUser = createMockUser({ id: 1, name: '테스트유저' });

const mockAuthState: AuthState = {
  user: mockUser,
  isLoggedIn: true,
  setAuth: vi.fn(),
  clearAuth: vi.fn(),
};

vi.mock('@/providers/auth-provider', () => ({
  useAuthStore: <T,>(selector: (state: AuthState) => T): T =>
    selector(mockAuthState),
}));

vi.mock('@/hooks/use-auth-action', () => ({
  useAuthAction: () => <T extends (...args: unknown[]) => unknown>(cb: T) => cb,
}));

const mockToggleFavoriteMutate = vi.fn();
vi.mock('../use-toggle-favorite', () => ({
  useToggleFavorite: () => ({ mutate: mockToggleFavoriteMutate }),
}));

const mockJoinMeetingMutate = vi.fn();
vi.mock('../use-join-meeting', () => ({
  useJoinMeeting: () => ({
    mutate: mockJoinMeetingMutate,
    isPending: false,
    variables: null,
  }),
}));

const mockShareMeeting = vi.fn();
vi.mock('../use-share-meeting', () => ({
  useShareMeeting: () => ({ shareMeeting: mockShareMeeting }),
}));

const dummyMeeting = createMockMeeting({
  id: 100,
  hostId: 2,
  createdBy: 2,
  host: { id: 2, name: '호스트', image: null },
  isJoined: false,
  isFavorited: false,
});

function createMockMouseEvent(): React.MouseEvent<HTMLButtonElement> {
  return {
    stopPropagation: vi.fn(),
  } as unknown as React.MouseEvent<HTMLButtonElement>;
}

describe('useMeetingCardActions 커스텀 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('카드 클릭 시 해당 모임의 상세페이지 경로로 이동한다', () => {
    const { result } = renderHook(() => useMeetingCardActions(dummyMeeting));

    act(() => {
      result.current.handleCardClick();
    });

    expect(mockPush).toHaveBeenCalledWith('/meetings/100');
  });

  it('찜하기 클릭 시 toggleFavorite mutation을 실행한다', () => {
    const { result } = renderHook(() => useMeetingCardActions(dummyMeeting));

    act(() => {
      const mockEvent = createMockMouseEvent();
      result.current.handleSaveClick(mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    expect(mockToggleFavoriteMutate).toHaveBeenCalledWith({
      meetingId: 100,
      isSaved: false,
    });
  });

  it('호스트가 참여 버튼 클릭 시 모임 공유하기가 실행된다', () => {
    const hostMeeting = createMockMeeting({
      id: 100,
      hostId: 1,
      createdBy: 1,
      host: { id: 1, name: '테스트유저', image: null },
    });

    const { result } = renderHook(() => useMeetingCardActions(hostMeeting));

    act(() => {
      const mockEvent = createMockMouseEvent();
      result.current.handleJoinClick(mockEvent);
    });

    expect(mockShareMeeting).toHaveBeenCalledWith(100);
  });

  it('참여하지 않은 일반 사용자가 참여 버튼 클릭 시 joinMeeting mutation이 실행된다', () => {
    const { result } = renderHook(() => useMeetingCardActions(dummyMeeting));

    act(() => {
      const mockEvent = createMockMouseEvent();
      result.current.handleJoinClick(mockEvent);
    });

    expect(mockJoinMeetingMutate).toHaveBeenCalledWith({
      meetingId: 100,
      isJoined: false,
    });
  });
});
