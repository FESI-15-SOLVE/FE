'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

export interface AlertModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  hideCancel?: boolean;
}

export function AlertModal({
  isOpen,
  onOpenChange,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
  hideCancel = false,
}: AlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          'border-none bg-white max-w-none w-auto',
          'p-6 sm:px-10 sm:pb-10 sm:pt-12',
          'rounded-[24px] sm:rounded-[40px]',
          'w-85.75 sm:w-140',
          'gap-8 sm:gap-14',
        )}
      >
        <AlertDialogHeader
          className={cn(
            'flex flex-col items-center justify-center text-center space-y-0',
            'gap-2 mt-0 sm:gap-4',
          )}
        >
          <AlertDialogTitle
            className={cn(
              'text-neutral-900 font-semibold',
              'text-lg sm:text-2xl sm:leading-8',
            )}
          >
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription
              className={cn(
                'text-neutral-500 font-medium',
                'text-sm sm:text-lg',
              )}
            >
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter
          className={cn(
            'flex flex-row items-center w-full justify-center space-x-0 bg-white border-none',
            'gap-3 sm:gap-4',
          )}
        >
          {!hideCancel && (
            <AlertDialogCancel
              onClick={onCancel}
              variant="tertiary"
              className={cn(
                'mt-0 flex-1 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500',
                'h-10 sm:h-15',
                'rounded-[10px] sm:rounded-2xl',
                'text-sm sm:text-xl',
              )}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={onConfirm}
            variant={'primary'}
            className={cn(
              'mt-0 flex-1',
              'h-10 sm:h-15',
              'rounded-[10px] sm:rounded-2xl',
              'text-sm sm:text-xl',
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
