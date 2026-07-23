'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateMeetingModalProps } from '../../types';
import { Step1Category } from './step1-category';
import { Step2BasicInfo } from './step2-basic-info';
import { Step3Schedule } from './step3-schedule';
import { useCreateMeeting } from '../../hooks';
import { Button } from '@/components/ui/button';

// 모달이 열릴 때 상태를 깨끗이 새롭게 가지는 내부 폼 컴포넌트
function CreateMeetingForm({
  initialStep,
  onSubmit,
  categories,
  onClose,
}: Omit<CreateMeetingModalProps, 'isOpen'>) {
  const {
    currentStep,
    values,
    errors,
    handleChange,
    handleStepChange,
    handleSubmit,
  } = useCreateMeeting({ initialStep, onSubmit });

  return (
    <>
      {/* 상단 고정 헤더 */}
      <DialogHeader className="space-y-0 flex flex-row items-center justify-between pr-8">
        <div className="flex items-center gap-3">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-neutral-900 leading-none">
            모임 만들기
          </DialogTitle>
          <span className="text-lg sm:text-2xl font-bold text-neutral-900 leading-none">
            {currentStep}/3
          </span>
        </div>
      </DialogHeader>

      {/* 동적 마운트 영역 - 현재 활성 단계만 마운트 */}
      <div className="w-full">
        {currentStep === 1 && (
          <Step1Category
            categories={categories}
            selectedCategoryId={values.categoryId}
            onSelectCategory={(id) => handleChange('categoryId', id)}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <Step2BasicInfo
            values={values}
            errors={errors}
            onChange={handleChange}
          />
        )}

        {currentStep === 3 && (
          <Step3Schedule
            values={values}
            errors={errors}
            onChange={handleChange}
          />
        )}
      </div>

      {/* 하단 공통 액션 버튼 영역 */}
      <div className="flex items-center gap-3 sm:gap-4 w-full mt-4 sm:mt-10">
        <Button
          type="button"
          variant="tertiary"
          size="md"
          className="flex-1 sm:h-15 sm:text-xl sm:rounded-2xl"
          onClick={currentStep === 1 ? onClose : () => handleStepChange(currentStep - 1)}
        >
          {currentStep === 1 ? '취소' : '이전'}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="flex-1 sm:h-15 sm:text-xl sm:rounded-2xl"
          onClick={currentStep === 3 ? handleSubmit : () => handleStepChange(currentStep + 1)}
        >
          {currentStep === 3 ? '모임 만들기' : '다음'}
        </Button>
      </div>
    </>
  );
}

export function CreateMeetingModal({
  isOpen,
  onClose,
  initialStep = 1,
  onSubmit,
  categories,
}: CreateMeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* 컨테이너 너비 조절: 모바일 최대 343px, 데스크톱 최대 544px */}
      <DialogContent className="max-w-85.75 sm:max-w-136 p-6 sm:p-12 rounded-3xl gap-8 border-none bg-white">
        {/* isOpen이 참일 때만 알맹이 컴포넌트를 마운트하여 상태 자연 초기화 실현 */}

        <CreateMeetingForm
          initialStep={initialStep}
          onSubmit={onSubmit}
          categories={categories}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
