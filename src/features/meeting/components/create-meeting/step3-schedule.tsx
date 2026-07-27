import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, InputField, TextAreaField } from '@/components/ui/Input';
import { CreateMeetingValues } from '../../types';
import { DateTimePicker } from './date-time-picker';

export function Step3Schedule() {
  const { watch, setValue, formState: { errors } } = useFormContext<CreateMeetingValues>();
  const dateTime = watch('dateTime');
  const registrationEnd = watch('registrationEnd');
  const capacity = watch('capacity');
  const description = watch('description');

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setValue('capacity', '', { shouldValidate: true });
    } else {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        setValue('capacity', parsed, { shouldValidate: true });
      }
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* 모임 일정 */}
      <InputField label="모임 일정" required error={errors.dateTime?.message}>
        <DateTimePicker
          value={dateTime}
          onChange={(date) => setValue('dateTime', date, { shouldValidate: true })}
          error={!!errors.dateTime}
        />
      </InputField>

      {/* 모집 마감 날짜 */}
      <InputField label="모집 마감 날짜" required error={errors.registrationEnd?.message}>
        <DateTimePicker
          value={registrationEnd}
          onChange={(date) => setValue('registrationEnd', date, { shouldValidate: true })}
          error={!!errors.registrationEnd}
        />
      </InputField>

      {/* 모임 정원 */}
      <InputField label="모임 정원" required error={errors.capacity?.message}>
        <Input
          placeholder="숫자만 입력해주세요"
          type="text"
          inputMode="numeric"
          value={capacity}
          onChange={handleCapacityChange}
          destructive={!!errors.capacity}
        />
      </InputField>
      
      {/* 모임 설명 */}
      <TextAreaField
        label="모임 설명"
        placeholder="모임에 대한 설명을 입력해주세요 (최대 1000자)"
        value={description}
        onChange={(e) => setValue('description', e.target.value, { shouldValidate: true })}
        destructive={!!errors.description}
        helperText={errors.description?.message}
      />
    </div>
  );
}
