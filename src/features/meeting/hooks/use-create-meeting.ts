import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateMeetingPayload,
  createMeetingSchema,
  stepSchemas,
} from '../schema/create-shcema';
import { CreateMeetingValues } from '../types';
import { useCreateMeetingMutation } from './use-create-meeting-mutation';

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
      const currentSchema = stepSchemas[currentStep as keyof typeof stepSchemas];

      if (currentSchema) {
        const stepFields = currentSchema.keyof().options as Array<
          keyof CreateMeetingValues
        >;
        const isValid = await trigger(stepFields);
        if (!isValid) return;
      }
    }

    setCurrentStep(nextStep);
  };

  // 폼 최종 제출
  const submitForm = handleSubmit(async (data) => {
    await createMeetingAsync(data);
    onSubmit(data);
  });

  return {
    methods,
    currentStep,
    isSubmitting,
    handleStepChange,
    submitForm,
  };
}
