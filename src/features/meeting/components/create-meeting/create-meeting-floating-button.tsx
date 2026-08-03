'use client';

import { useState } from 'react';
import { CreateButton } from '@/components/ui/button';
import { CreateMeetingModal } from '@/features/meeting/components/create-meeting/create-meeting-modal';
import { CATEGORIES_DATA } from '@/constants/categories';
import { useAuthStore } from '@/providers/auth-provider';
import { useLoginAlert } from '@/hooks/use-login-alert';

export function CreateMeetingFloatingButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const openLoginAlert = useLoginAlert((s) => s.openAlert);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      openLoginAlert();
      return;
    }
    setCreateModalOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <CreateButton onClick={handleCreateClick}>
          모임 만들기
        </CreateButton>
      </div>

      {createModalOpen && (
        <CreateMeetingModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          categories={CATEGORIES_DATA}
          onSubmit={() => {
            setCreateModalOpen(false);
          }}
        />
      )}
    </>
  );
}
