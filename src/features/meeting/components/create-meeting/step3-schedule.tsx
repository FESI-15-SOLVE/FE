import React from 'react';
import { useFormContext, Controller, useFormState } from 'react-hook-form';
import { Input } from '@/components/ui/Input/input';
import { InputField } from '@/components/ui/Input/input-field';
import { TextAreaField } from '@/components/ui/Input/textarea-field';
import { CreateMeetingValues } from '../../types';
import { DateTimePicker } from './date-time-picker';

export function Step3Schedule() {
  const { register, control } = useFormContext<CreateMeetingValues>();
  const { errors } = useFormState({ control });

  return (
    <div className="w-full space-y-5">
      {/* 모임 일정 */}
      <InputField label="모임 일정" required error={errors.dateTime?.message}>
        <Controller
          control={control}
          name="dateTime"
          render={({ field }) => (
            <DateTimePicker
              value={field.value}
              onChange={field.onChange}
              error={!!errors.dateTime}
            />
          )}
        />
      </InputField>

      {/* 모집 마감 날짜 */}
      <InputField
        label="모집 마감 날짜"
        required
        error={errors.registrationEnd?.message}
      >
        <Controller
          control={control}
          name="registrationEnd"
          render={({ field }) => (
            <DateTimePicker
              value={field.value}
              onChange={field.onChange}
              error={!!errors.registrationEnd}
            />
          )}
        />
      </InputField>

      {/* 모임 정원 */}
      <InputField label="모임 정원" required error={errors.capacity?.message}>
        <Input
          placeholder="숫자만 입력해주세요"
          type="text"
          inputMode="numeric"
          destructive={!!errors.capacity}
          {...register('capacity', {
            setValueAs: (v) => (v === '' ? '' : parseInt(v, 10)),
          })}
        />
      </InputField>

      {/* 모임 설명 */}
      <TextAreaField
        label="모임 설명"
        placeholder="모임에 대한 설명을 입력해주세요 (최대 1000자)"
        destructive={!!errors.description}
        helperText={errors.description?.message}
        {...register('description')}
      />
    </div>
  );
}
