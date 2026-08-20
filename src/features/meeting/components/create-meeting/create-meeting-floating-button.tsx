'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CreateButton } from '@/components/ui/button';
import { CreateMeetingModal } from '@/features/meeting/components/create-meeting/create-meeting-modal';
import { CATEGORIES_DATA } from '@/constants/categories';
import { useAuthAction } from '@/hooks/use-auth-action';
import { ROUTES } from '@/constants/routes';

export function CreateMeetingFloatingButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const withAuth = useAuthAction();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleCreateClick = withAuth(() => {
    setCreateModalOpen(true);
  });

  const handleSubmit = (meetingId: number) => {
    setCreateModalOpen(false);
    startTransition(() => {
      router.push(ROUTES.MEETINGS.DETAIL(meetingId));
    });
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <CreateButton onClick={handleCreateClick}>모임 만들기</CreateButton>
      </div>

      {createModalOpen && (
        <CreateMeetingModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          categories={CATEGORIES_DATA}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
