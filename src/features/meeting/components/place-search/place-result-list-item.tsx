import { MapPin } from 'lucide-react';
import { PlaceResultItem } from './types';

export interface PlaceResultListItemProps {
  place: PlaceResultItem;
  isSelected: boolean;
  onSelect: (place: PlaceResultItem) => void;
}

export function PlaceResultListItem({
  place,
  isSelected,
  onSelect,
}: PlaceResultListItemProps) {
  return (
    <div
      onClick={() => onSelect(place)}
      className={`p-3 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-gradient-500 bg-white shadow-sm '
          : 'border-neutral-200 hover:border-neutral-300 bg-white'
      }`}
    >
      <div className="flex items-start gap-2">
        <MapPin
          className={`size-4 mt-0.5 shrink-0 ${
            isSelected ? 'text-green-500' : 'text-neutral-400'
          }`}
        />
        <div className="space-y-1 text-left">
          <p className="font-semibold text-sm text-neutral-900">
            {place.place_name}
          </p>
          <p className="text-xs text-neutral-600">
            {place.road_address_name || place.address_name}
          </p>
        </div>
      </div>
    </div>
  );
}
