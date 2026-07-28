'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AlertModal, AlertModalProps } from './alert-modal';
import { useLoginAlert } from '@/hooks/use-login-alert';

export interface LoginAlertModalProps
  extends Omit<
    AlertModalProps,
    'isOpen' | 'onOpenChange' | 'title' | 'description' | 'onConfirm' | 'confirmText' | 'cancelText'
  > {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * 로그인이 필요한 액션 수행 시 노출되는 전역 로그인 유도 모달
 */
export function LoginAlertModal({
  title = '로그인이 필요한 서비스입니다.',
  description = '로그인 페이지로 이동하시겠습니까?',
  ...props
}: LoginAlertModalProps) {
  const router = useRouter();
  const { isOpen, closeAlert } = useLoginAlert();

  const handleConfirm = () => {
    closeAlert();
    router.push('/sign-in');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAlert();
    }
  };

  return (
    <AlertModal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      onConfirm={handleConfirm}
      onCancel={closeAlert}
      {...props}
    />
  );
}
