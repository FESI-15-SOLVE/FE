import { Logo } from '@/components/ui/logo';
import { DesktopNav } from './desktop-nav';
import { NAV_LINKS } from '@/constants/navigation';
import { GnbUserActions } from './gnb-user-actions';
import { User } from '@/api/data-contracts';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { favoriteQueries } from '@/features/meeting/queries/favorite-query';

interface GlobalNavigationBarProps {
  initialUser: User | null;
}

export async function GlobalNavigationBar({ initialUser }: GlobalNavigationBarProps) {
  const isLoggedIn = !!initialUser;

  // SSR 하이드레이션을 위한 QueryClient 생성 및 찜 개수 prefetch
  const queryClient = new QueryClient();
  if (isLoggedIn) {
    try {
      const res = await ServerApi.favorites.getFavoriteCount({
        teamId: TEAM_ID,
      });
      queryClient.setQueryData(favoriteQueries.countKey(), res.data);
    } catch (e) {
      console.error('Failed to prefetch favorite count in GNB:', e);
    }
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <header className="sticky top-0 z-40 w-full bg-gray-50 border-b border-gray-200">
        <div className="mx-auto flex h-14 sm:h-16 max-w-300 items-center justify-between px-4 sm:px-6">
          {/* 좌측: 로고 및 데스크톱 네비게이션 */}
          <div className="flex items-center gap-6">
            <Logo />
            {/* 데스크톱 네비게이션 */}
            <DesktopNav links={NAV_LINKS} isLoggedIn={isLoggedIn} />
          </div>

          {/* 우측: 유저 액션 (클라이언트 컴포넌트) */}
          <GnbUserActions />
        </div>
      </header>
    </HydrationBoundary>
  );
}
