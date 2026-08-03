'use client';

import React, { useState, useId } from 'react';
import {
  useFormContext,
  Controller,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Input } from '@/components/ui/input/input';
import { InputField } from '@/components/ui/input/input-field';
import { FileInput } from '@/components/ui/input/file-input';
import { PlaceSearchModal } from '@/features/meeting/components/place-search/place-search-modal';
import { EditMeetingValues } from '../../types/edit-meeting';
import { CATEGORIES_DATA } from '@/constants/categories';
import IconLocation from '@/assets/icons/location.svg';
import IconChevronDown from '@/assets/icons/chevron_down.svg';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Tab1BasicInfo() {
  const generatedId = useId();
  const locationId = `location-${generatedId}`;
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { register, control, setValue } = useFormContext<EditMeetingValues>();
  const { errors } = useFormState({ control });

  const currentType = useWatch({ control, name: 'type' });
  const placeAddress = useWatch({ control, name: 'placeAddress' });

  return (
    <div className="w-full space-y-5">
      {/* 1. 카테고리 선택 드롭다운 (클릭 시 아래로 주르륵 열림) */}
      <InputField label="카테고리" required error={errors.type?.message}>
        <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <PopoverTrigger
            render={
              <button
                type="button"
                className={cn(
                  'w-full px-4 py-3 rounded-xl border text-sm font-medium text-left flex items-center justify-between bg-white cursor-pointer hover:border-neutral-400 transition-colors',
                  errors.type ? 'border-danger-500' : 'border-neutral-200',
                )}
              >
                <span className="text-neutral-900">
                  {currentType || '선택해주세요'}
                </span>
                <IconChevronDown className="size-4 text-neutral-400" />
              </button>
            }
          />
          <PopoverContent
            align="start"
            className="w-[calc(100vw-48px)] sm:w-[456px] p-1 bg-white rounded-xl shadow-lg border border-neutral-100 flex flex-col gap-1 z-50"
          >
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setValue('type', cat.name, { shouldValidate: true });
                  setIsCategoryOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg transition-colors cursor-pointer',
                  currentType === cat.name
                    ? 'border-gradient-600'
                    : 'text-neutral-700 hover:bg-neutral-50',
                )}
              >
                {cat.name}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </InputField>

      {/* 2. 모임 이름 */}
      <InputField label="모임 이름" required error={errors.name?.message}>
        <Input
          placeholder="모임 이름을 입력해주세요"
          destructive={!!errors.name}
          {...register('name')}
        />
      </InputField>

      {/* 3. 장소 선택 (카카오 맵 검색 모달) */}
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
                  placeAddress: addr,
                  lat,
                  lng,
                }) => {
                  setValue('location', extractedRegion, {
                    shouldValidate: true,
                  });
                  setValue('placeAddress', addr);
                  setValue('latitude', lat);
                  setValue('longitude', lng);
                }}
              />
            </>
          )}
        />
      </InputField>

      {/* 4. 수동 상세주소 입력창 */}
      <InputField label="상세주소" error={errors.detailAddress?.message}>
        <Input
          placeholder="동, 층수 등 상세주소를 입력해주세요 (선택)"
          destructive={!!errors.detailAddress}
          {...register('detailAddress')}
        />
      </InputField>

      {/* 5. 이미지 첨부 */}
      <InputField label="이미지" error={errors.file?.message as string}>
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
