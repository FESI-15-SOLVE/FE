import React from 'react';
import { useFormContext, Controller, useFormState } from 'react-hook-form';
import { Input } from '@/components/ui/input/input';
import { InputField } from '@/components/ui/input/input-field';
import { TextAreaField } from '@/components/ui/input/textarea-field';
import { CreateMeetingValues } from '../../types/create-meeting';
import { DateTimePicker } from './date-time-picker';

export function Step3Schedule() {
  const { register, control } = useFormContext<CreateMeetingValues>();
  const { errors } = useFormState({ control });

  const dateTimeError =
    errors.dateTimeDate?.message || errors.dateTimeTime?.message;
  const registrationEndError =
    errors.registrationEndDate?.message || errors.registrationEndTime?.message;

  return (
    <div className="w-full space-y-5">
      {/* 모임 일정 */}
      <InputField label="모임 일정" required error={dateTimeError}>
        <Controller
          control={control}
          name="dateTimeDate"
          render={({ field: dateField }) => (
            <Controller
              control={control}
              name="dateTimeTime"
              render={({ field: timeField }) => (
                <DateTimePicker
                  dateValue={dateField.value}
                  onDateChange={dateField.onChange}
                  timeValue={timeField.value}
                  onTimeChange={timeField.onChange}
                  dateError={!!errors.dateTimeDate}
                  timeError={!!errors.dateTimeTime}
                />
              )}
            />
          )}
        />
      </InputField>

      {/* 모집 마감 날짜 */}
      <InputField label="모집 마감 날짜" required error={registrationEndError}>
        <Controller
          control={control}
          name="registrationEndDate"
          render={({ field: dateField }) => (
            <Controller
              control={control}
              name="registrationEndTime"
              render={({ field: timeField }) => (
                <DateTimePicker
                  dateValue={dateField.value}
                  onDateChange={dateField.onChange}
                  timeValue={timeField.value}
                  onTimeChange={timeField.onChange}
                  dateError={!!errors.registrationEndDate}
                  timeError={!!errors.registrationEndTime}
                />
              )}
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
