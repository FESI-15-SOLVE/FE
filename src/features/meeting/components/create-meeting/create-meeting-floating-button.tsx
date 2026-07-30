'use client';

import { useState } from 'react';
import { CreateButton } from '@/components/ui/button';
import { CreateMeetingModal } from '@/features/meeting/components/create-meeting/create-meeting-modal';
import { CATEGORIES_DATA } from '@/constants/categories';

export function CreateMeetingFloatingButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <CreateButton onClick={() => setCreateModalOpen(true)}>
          모임 만들기
        </CreateButton>
      </div>

      {createModalOpen && (
        <CreateMeetingModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          categories={CATEGORIES_DATA}
          onSubmit={(values) => {
            console.log('Submitted create meeting:', values);
            setCreateModalOpen(false);
          }}
        />
      )}
    </>
  );
}
