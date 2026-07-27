import { useState, useId } from 'react';
import { useFormContext, Controller, useFormState } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { InputField, FileInput } from '@/components/ui/Input';
import { RegionSelectModal } from '@/features/meeting/components/region-select';
import { CreateMeetingValues } from '../../types';

export function Step2BasicInfo() {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const { register, control } = useFormContext<CreateMeetingValues>();
  const { errors } = useFormState({ control });

  return (
    <div className="w-full space-y-5">
      <InputField label="모임 이름" required error={errors.name?.message}>
        <Input
          placeholder="모임 이름을 입력해주세요"
          destructive={!!errors.name}
          {...register('name')}
        />
      </InputField>

      <InputField label="장소" required error={errors.location?.message}>
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <>
              <Input
                id={locationId}
                placeholder="지역을 선택해주세요"
                destructive={!!errors.location}
                value={field.value || ''}
                readOnly
                onClick={() => setIsRegionModalOpen(true)}
                className="cursor-pointer"
              />
              <RegionSelectModal
                isOpen={isRegionModalOpen}
                onClose={() => setIsRegionModalOpen(false)}
                selectedRegion={field.value}
                onSelect={(region) => field.onChange(region)}
              />
            </>
          )}
        />
      </InputField>

      <InputField label="상세주소" error={errors.detailAddress?.message}>
        <Input
          placeholder="상세주소를 입력해주세요"
          destructive={!!errors.detailAddress}
          {...register('detailAddress')}
        />
      </InputField>

      <InputField
        label="이미지"
        required
        error={errors.file?.message as string}
      >
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <FileInput
              value={field.value}
              onChange={field.onChange}
              size="lg"
            />
          )}
        />
      </InputField>
    </div>
  );
}
