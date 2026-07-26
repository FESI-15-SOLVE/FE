import React from 'react';
import { Input, InputField, TextAreaField } from '@/components/ui/Input';
import { CreateMeetingValues } from '../../types';
import { DateTimePicker } from './date-time-picker';

export interface Step3ScheduleProps {
  values: Pick<
    CreateMeetingValues,
    'dateTime' | 'registrationEnd' | 'capacity' | 'description'
  >;
  errors?: Partial<Record<keyof CreateMeetingValues, string>>;
  onChange: <K extends keyof CreateMeetingValues>(
    field: K,
    value: CreateMeetingValues[K],
  ) => void;
}

export function Step3Schedule({
  values,
  errors,
  onChange,
}: Step3ScheduleProps) {

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('capacity', '');
    } else {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        onChange('capacity', parsed);
      }
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* 모임 일정 */}
      <InputField label="모임 일정" required error={errors?.dateTime}>
        <DateTimePicker
          value={values.dateTime}
          onChange={(date) => onChange('dateTime', date)}
          error={!!errors?.dateTime}
        />
      </InputField>

      {/* 모집 마감 날짜 */}
      <InputField label="모집 마감 날짜" required error={errors?.registrationEnd}>
        <DateTimePicker
          value={values.registrationEnd}
          onChange={(date) => onChange('registrationEnd', date)}
          error={!!errors?.registrationEnd}
        />
      </InputField>

      {/* 모임 정원 */}
      <InputField label="모임 정원" required error={errors?.capacity}>
        <Input
          placeholder="숫자만 입력해주세요"
          type="text"
          inputMode="numeric"
          value={values.capacity}
          onChange={handleCapacityChange}
          destructive={!!errors?.capacity}
        />
      </InputField>
      {/* 모임 설명 */}
      <TextAreaField
        label="모임 설명"
        placeholder="모임에 대한 설명을 입력해주세요 (최대 1000자)"
        value={values.description}
        onChange={(e) => onChange('description', e.target.value)}
        destructive={!!errors?.description}
        helperText={errors?.description}
      />
    </div>
  );
}
