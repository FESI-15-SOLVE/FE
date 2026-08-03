'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { MeetingWithHost } from '@/api/data-contracts';
import { Tab1BasicInfo } from '../edit-meeting/tab1-basic-info';
import { Tab2Schedule } from '../edit-meeting/tab2-schedule';
import { useEditMeeting } from '../../hooks/use-edit-meeting';
import { cn } from '@/lib/utils';

export interface EditMeetingModalProps {
  meeting: MeetingWithHost;
  isOpen: boolean;
  onClose: () => void;
}

function EditMeetingForm({
  meeting,
  onClose,
}: {
  meeting: MeetingWithHost;
  onClose: () => void;
}) {
  const { methods, activeTab, setActiveTab, isSubmitting, submitForm } =
    useEditMeeting({
      meeting,
      onSubmitSuccess: onClose,
    });

  return (
    <FormProvider {...methods}>
      {/* 상단 탭 헤더: [기본 정보] | [일정 및 인원] */}
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
          모임 수정
        </DialogTitle>

        <div className="flex border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={cn(
              'flex-1 py-3 text-center text-sm sm:text-base font-semibold border-b-2 transition-colors cursor-pointer',
              activeTab === 'basic'
                ? 'border-green-500 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600',
            )}
          >
            기본 정보
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={cn(
              'flex-1 py-3 text-center text-sm sm:text-base font-semibold border-b-2 transition-colors cursor-pointer',
              activeTab === 'schedule'
                ? 'border-green-500 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-600',
            )}
          >
            일정 및 인원
          </button>
        </div>
      </DialogHeader>

      {/* 탭 동적 마운트 영역 */}
      <div className="w-full mt-2">
        {activeTab === 'basic' && <Tab1BasicInfo />}
        {activeTab === 'schedule' && <Tab2Schedule />}
      </div>

      {/* 하단 공통 버튼 영역 */}
      <div className="flex items-center gap-3 w-full mt-6">
        <Button
          type="button"
          variant="tertiary"
          className="flex-1 h-12 text-base rounded-xl"
          onClick={onClose}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          type="button"
          variant="primary"
          className="flex-1 h-12 text-base rounded-xl"
          onClick={submitForm}
          disabled={isSubmitting}
        >
          {isSubmitting ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </FormProvider>
  );
}

export function EditMeetingModal({
  meeting,
  isOpen,
  onClose,
}: EditMeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-85.75 sm:max-w-136 p-6 sm:p-10 rounded-3xl gap-6 border-none bg-white max-h-[90vh] overflow-y-auto">
        {isOpen && <EditMeetingForm meeting={meeting} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
