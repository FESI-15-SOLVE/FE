import { useState, useId } from 'react';
import {
  useFormContext,
  Controller,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { InputField, FileInput } from '@/components/ui/Input';
import { PlaceSearchModal } from '@/features/meeting/components/place-search';
import { CreateMeetingValues } from '../../types';
import { IconLocation } from '@/components/icons';

export function Step2BasicInfo() {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);

  const { register, control, setValue } = useFormContext<CreateMeetingValues>();
  const { errors } = useFormState({ control });

  // 선택한 카카오 장소명+도로명 주소 관찰
  const placeAddress = useWatch({ control, name: 'placeAddress' });

  return (
    <div className="w-full space-y-5">
      {/* 모임 이름 */}
      <InputField label="모임 이름" required error={errors.name?.message}>
        <Input
          placeholder="모임 이름을 입력해주세요"
          destructive={!!errors.name}
          {...register('name')}
        />
      </InputField>

      {/* 장소 선택 (카카오 맵 검색 모달) */}
      <InputField label="장소" required error={errors.location?.message}>
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <>
              <Input
                id={locationId}
                placeholder="장소를 검색하여 선택해주세요"
                destructive={!!errors.location}
                value={placeAddress || field.value || ''}
                readOnly
                onClick={() => setIsPlaceModalOpen(true)}
                className="cursor-pointer"
                rightIcon={
                  <IconLocation
                    className="size-5 cursor-pointer text-neutral-400 hover:text-brand-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaceModalOpen(true);
                    }}
                  />
                }
              />
              <PlaceSearchModal
                isOpen={isPlaceModalOpen}
                onClose={() => setIsPlaceModalOpen(false)}
                onSelectPlace={({
                  extractedRegion,
                  placeAddress,
                  lat,
                  lng,
                }) => {
                  // location에는 자동 추출된 region (예: "서울 강남구") 저장
                  setValue('location', extractedRegion, {
                    shouldValidate: true,
                  });
                  // placeAddress에는 카카오 장소명+도로명 저장
                  setValue('placeAddress', placeAddress);
                  // 위도 / 경도 저장
                  setValue('latitude', lat);
                  setValue('longitude', lng);
                }}
              />
            </>
          )}
        />
      </InputField>

      {/* 수동 상세주소 입력창 */}
      <InputField label="상세주소" error={errors.detailAddress?.message}>
        <Input
          placeholder="동, 층수 등 상세주소를 입력해주세요 (선택)"
          destructive={!!errors.detailAddress}
          {...register('detailAddress')}
        />
      </InputField>

      {/* 이미지 첨부 */}
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
