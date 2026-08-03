'use client';

import React from 'react';
import { AlertModal } from '@/components/ui/alert-modal';

export interface CancelMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export function CancelMeetingModal({
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: CancelMeetingModalProps) {
  return (
    <AlertModal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="모임을 취소하시겠습니까?"
      description="취소된 모임은 참가자가 더 이상 참여할 수 없게 됩니다."
      cancelText="닫기"
      confirmText={isPending ? '처리 중...' : '모임 취소하기'}
      onCancel={onClose}
      onConfirm={onConfirm}
    />
  );
}
