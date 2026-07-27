import React from 'react';
import { Button } from '@/components/ui/button';
import { PlaceResultItem } from './types';

export interface SelectedPlaceFooterProps {
  selectedPlace: PlaceResultItem | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SelectedPlaceFooter({
  selectedPlace,
  onCancel,
  onConfirm,
}: SelectedPlaceFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 pt-1 border-t border-neutral-100">
      <div className="text-xs sm:text-sm text-neutral-700 truncate w-full sm:w-auto text-left">
        {selectedPlace ? (
          <span>
            선택된 장소:{' '}
            <strong className="text-brand-600 font-semibold">
              {selectedPlace.place_name}
            </strong>{' '}
            ({selectedPlace.road_address_name || selectedPlace.address_name})
          </span>
        ) : (
          <span className="text-neutral-400">선택된 장소가 없습니다.</span>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
        <Button
          type="button"
          variant="tertiary"
          size="md"
          className="flex-1 sm:w-24 rounded-xl"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="flex-1 sm:w-28 rounded-xl"
          disabled={!selectedPlace}
          onClick={onConfirm}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}
