'use client';

import { CreateButton } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthAction } from '@/hooks/use-auth-action';
import { ROUTES } from '@/constants/routes';

export function CreatePostFloatingButton() {
  const router = useRouter();
  const withAuth = useAuthAction();

  const handleClick = withAuth(() => router.push(ROUTES.TALK.CREATE));

  return (
    // 모바일에서만 표시 (md 이상은 헤더 버튼으로 대체)
    <div className="fixed bottom-8 right-8 z-40 md:hidden">
      <CreateButton onClick={handleClick}>게시물 등록하기</CreateButton>
    </div>
  );
}
