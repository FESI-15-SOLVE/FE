import { useState, useId } from 'react';
import { useFormContext, Controller, useFormState } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { InputField, FileInput } from '@/components/ui/Input';
import { RegionSelectModal } from '@/features/meeting/components/region-select';
import { PlaceSearchModal } from '@/features/meeting/components/place-search/place-search-modal';
import { CreateMeetingValues } from '../../types';
import { IconLocation } from '@/components/icons';

export function Step2BasicInfo() {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);

  const { register, control, setValue } = useFormContext<CreateMeetingValues>();
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
          placeholder="예: 스타벅스 강남역점, 서울 강남구 강남대로 390, 3층"
          destructive={!!errors.detailAddress}
          rightIcon={
            <IconLocation
              className="size-5 cursor-pointer text-neutral-400 hover:text-brand-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaceModalOpen(true);
              }}
            />
          }
          onClick={() => setIsPlaceModalOpen(true)}
          className="cursor-pointer"
          {...register('detailAddress')}
        />
        <PlaceSearchModal
          isOpen={isPlaceModalOpen}
          onClose={() => setIsPlaceModalOpen(false)}
          onSelectPlace={({ formattedAddress, lat, lng }) => {
            setValue('detailAddress', formattedAddress, { shouldValidate: true });
            setValue('latitude', lat);
            setValue('longitude', lng);
          }}
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
