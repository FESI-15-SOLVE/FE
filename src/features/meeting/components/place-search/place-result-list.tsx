import React from 'react';
import { MapPin } from 'lucide-react';
import { PlaceResultItem } from './types';
import { PlaceResultListItem } from './place-result-list-item';

export interface PlaceResultListProps {
  places: PlaceResultItem[];
  selectedId?: string;
  searchError: string | null;
  onSelect: (place: PlaceResultItem) => void;
}

export function PlaceResultList({
  places,
  selectedId,
  searchError,
  onSelect,
}: PlaceResultListProps) {
  return (
    <div className="w-full sm:w-[38%] flex flex-col h-full bg-gray-50 p-3 rounded-2xl border border-neutral-200 min-h-0">
      <div className="text-xs font-semibold text-neutral-500 mb-2 px-1">
        {places.length > 0 ? `검색 결과 (${places.length}건)` : '장소 안내'}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {searchError && (
          <div className="text-sm text-neutral-500 text-center py-10">
            {searchError}
          </div>
        )}

        {places.length === 0 && !searchError && (
          <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400 p-4 space-y-2">
            <MapPin className="size-8 text-neutral-300 animate-bounce" />
            <p className="text-xs sm:text-sm">
              검색어를 입력하시거나, 우측 지도에서 원하는 위치를{' '}
              <strong>직접 클릭</strong>하여 핀을 찍으세요!
            </p>
          </div>
        )}

        {places.map((place) => (
          <PlaceResultListItem
            key={place.id}
            place={place}
            isSelected={selectedId === place.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
