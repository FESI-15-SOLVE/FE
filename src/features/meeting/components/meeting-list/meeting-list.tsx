'use client';

import { GroupCard } from '@/features/meeting/components/cards';
import { EmptyState } from '@/components/ui/empty';
import { MeetingWithHost } from '@/api/data-contracts';
import { mapMeetingToGroupCard } from '@/features/meeting/utils/meeting-mapper';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useMeetingList } from '@/features/meeting/hooks/use-meeting-list';
import { useRouter } from 'next/navigation';
import { useToggleFavorite } from '../../hooks/use-toggle-favorite';

interface MeetingListUIProps {
  meetings: MeetingWithHost[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onFetchNextPage: () => void;
}

export function MeetingListUI({
  meetings,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
}: MeetingListUIProps) {
  const router = useRouter();
  const toggleFavoriteMutation = useToggleFavorite();

  const observerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: onFetchNextPage,
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const handleClickCard = (id: number) => {
    router.push(`/meetings/${id}`);
  };

  const handleSaveClick = (meetingId: number, isFavorited?: boolean) => {
    toggleFavoriteMutation.mutate({
      meetingId,
      isSaved: Boolean(isFavorited),
    });
  };

  if (meetings.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          title="아직 등록된 모임이 없습니다"
          description="새로운 모임을 만들어 첫 번째 호스트가 되어보세요!"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {meetings.map((item: MeetingWithHost) => (
          <GroupCard
            key={item.id}
            meeting={mapMeetingToGroupCard(item)}
            onClick={() => handleClickCard(item.id)}
            onSaveClick={() => handleSaveClick(item.id, item.isFavorited)}
          />
        ))}
      </div>

      <div
        ref={observerRef}
        className="h-10 flex items-center justify-center py-4"
      >
        {isFetchingNextPage && (
          <p className="text-sm text-zinc-500 animate-pulse">
            모임을 불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
}

export function SuspensefulMeetingList() {
  const { meetings, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMeetingList();

  return (
    <MeetingListUI
      meetings={meetings}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onFetchNextPage={fetchNextPage}
    />
  );
}
