import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PersonnelContainer } from '../personnel-container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { meetingQueries } from '../../../queries/meeting-query';

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

describe('PersonnelContainer 컴포넌트', () => {
  it('참여자 수가 올바르게 렌더링되어야 합니다', () => {
    render(
      <PersonnelContainer
        meetingId="1"
        currentParticipant={16}
        minParticipant={5}
        maxParticipant={20}
      />,
      { wrapper: createWrapper() },
    );
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('명 참여')).toBeInTheDocument();
  });

  it('isConfirmed가 true일 때 개설확정 뱃지가 노출되어야 합니다', () => {
    render(
      <PersonnelContainer
        meetingId="1"
        currentParticipant={16}
        minParticipant={5}
        maxParticipant={20}
        isConfirmed={true}
      />,
      { wrapper: createWrapper() },
    );
    expect(screen.getAllByText('개설확정').length).toBeGreaterThan(0);
  });

  it('아바타 이미지가 4개를 초과할 때 +N 뱃지가 나타나야 합니다', async () => {
    vi.spyOn(meetingQueries, 'participantsQuery').mockReturnValue({
      queryKey: ['participants', '1'],
      queryFn: () =>
        Promise.resolve({
          data: Array(16).fill({
            user: { image: 'http://localhost:3845/assets/dummy.png' },
          }),
        }),
    } as any);

    render(
      <PersonnelContainer
        meetingId="1"
        currentParticipant={16}
        minParticipant={5}
        maxParticipant={20}
      />,
      { wrapper: createWrapper() },
    );
    expect(await screen.findByText('+12')).toBeInTheDocument();
  });
});
