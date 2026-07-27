import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateMeetingPayload,
  createMeetingSchema,
} from '../schema/create-shcema';
import { CreateMeetingValues } from '../types';
import { useCreateMeetingMutation } from './useCreateMeetingMutation';
import { ErrorResponse } from '@/api';

interface UseCreateMeetingProps {
  initialStep?: number;
  onSubmit: (values: CreateMeetingValues) => void;
}

export function useCreateMeeting({
  initialStep = 1,
  onSubmit,
}: UseCreateMeetingProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  // React Hook Form 초기화
  const methods = useForm<CreateMeetingValues, unknown, CreateMeetingPayload>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      categoryId: -1,
      name: '',
      location: '',
      detailAddress: '',
      file: null,
      dateTime: undefined,
      registrationEnd: undefined,
      capacity: '',
      description: '',
    },
    mode: 'onChange',
  });

  const { trigger, handleSubmit } = methods;

  const { mutateAsync: createMeetingAsync, isPending: isSubmitting } =
    useCreateMeetingMutation();

  const handleStepChange = async (nextStep: number) => {
    if (nextStep > currentStep) {
      let isValid = false;

      if (currentStep === 1) {
        isValid = await trigger(['categoryId']);
      } else if (currentStep === 2) {
        isValid = await trigger(['name', 'location', 'detailAddress', 'file']);
      }

      if (!isValid) return;
    }

    setCurrentStep(nextStep);
  };

  // 폼 최종 제출
  const submitForm = handleSubmit(async (data) => {
    try {
      await createMeetingAsync(data);

      // 상위 모달 닫기
      onSubmit(data);
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw new Error(error.message);
      }
    }
  });

  return {
    methods,
    currentStep,
    isSubmitting,
    handleStepChange,
    submitForm,
  };
}
