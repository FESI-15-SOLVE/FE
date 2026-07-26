import { useState } from 'react';
import { step1Schema, step2Schema, step3Schema } from '../schema';
import { CreateMeetingValues } from '../types';

interface UseCreateMeetingProps {
  initialStep?: number;
  onSubmit: (values: CreateMeetingValues) => void;
}

export function useCreateMeeting({
  initialStep = 1,
  onSubmit,
}: UseCreateMeetingProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [values, setValues] = useState<CreateMeetingValues>({
    categoryId: '',
    name: '',
    location: '',
    detailAddress: '',
    file: null,
    dateTime: undefined,
    registrationEnd: undefined,
    capacity: '',
    description: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateMeetingValues, string>>
  >({});

  // 입력값 변경 시 상태 반영 및 해당 필드 에러 제거
  const handleChange = <K extends keyof CreateMeetingValues>(
    field: K,
    value: CreateMeetingValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Zod의 분리된 스텝 스키마를 이용한 스텝 전이 검증 수행
  const handleStepChange = (nextStep: number) => {
    if (nextStep > currentStep) {
      if (currentStep === 1) {
        const result = step1Schema.safeParse(values);

        if (!result.success) {
          const fieldErrors = result.error.flatten().fieldErrors;
          setErrors({
            categoryId: fieldErrors.categoryId?.[0],
          });
          return;
        }
      } else if (currentStep === 2) {
        const result = step2Schema.safeParse(values);

        if (!result.success) {
          const fieldErrors = result.error.flatten().fieldErrors;
          setErrors({
            name: fieldErrors.name?.[0],
            location: fieldErrors.location?.[0],
            file: fieldErrors.file?.[0],
          });
          return;
        }
      }
    }
    setErrors({});
    setCurrentStep(nextStep);
  };

  // 최종 3단계 유효성 검사 및 최종 데이터 제출
  const handleSubmit = () => {
    const result = step3Schema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        dateTime: fieldErrors.dateTime?.[0],
        registrationEnd: fieldErrors.registrationEnd?.[0],
        capacity: fieldErrors.capacity?.[0],
        description: fieldErrors.description?.[0],
      });
      return;
    }

    setErrors({});
    onSubmit(values);
  };

  return {
    currentStep,
    values,
    errors,
    handleChange,
    handleStepChange,
    handleSubmit,
  };
}
