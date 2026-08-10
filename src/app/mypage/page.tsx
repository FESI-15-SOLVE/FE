import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { MyPageView } from '@/features/profile/components/mypage-view';
import {
  prefetchJoinedMeetings,
  prefetchWritableMeetings,
  prefetchMyWrittenReviews,
} from './_api/prefetch';

interface MyPageProps {
  searchParams: Promise<{ tab?: string; reviewTab?: string }>;
}

export default async function MyPage({ searchParams }: MyPageProps) {
  const { tab = 'joined', reviewTab = 'writable' } = await searchParams;
  const queryClient = new QueryClient();

  if (tab === 'joined') {
    await prefetchJoinedMeetings(queryClient);
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
