import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { MyPageView } from '@/features/profile/components/mypage-view';
import {
  prefetchJoinedMeetings,
  prefetchCreatedMeetings,
  prefetchWritableMeetings,
  prefetchMyWrittenReviews,
} from './_api/prefetch';

interface MyPageProps {
  searchParams: Promise<{ tab?: string; reviewTab?: string }>;
}

export default async function MyPage({ searchParams }: MyPageProps) {
  const { tab = 'joined', reviewTab = 'writable' } = await searchParams;
  const queryClient = getQueryClient();

  if (tab === 'joined') {
    await prefetchJoinedMeetings(queryClient);
  } else if (tab === 'created') {
    await prefetchCreatedMeetings(queryClient);
  } else if (tab === 'reviews') {
    if (reviewTab === 'written') {
      await prefetchMyWrittenReviews(queryClient);
    } else {
      await prefetchWritableMeetings(queryClient);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageView />
    </HydrationBoundary>
  );
}
