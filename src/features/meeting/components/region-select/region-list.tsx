import { REGIONS } from '@/constants/regions';
import { RegionItem } from './region-item';
import { RegionGroup } from './region-group';
import { Accordion } from '@/components/ui/accordion';

export interface RegionListProps {
  expandedProvince: string | null;
  tempSelected: string | null;
  onToggleExpand: (province: string) => void;
  onSelectRegion: (regionName: string) => void;
}

export function RegionList({
  expandedProvince,
  tempSelected,
  onToggleExpand,
  onSelectRegion,
}: RegionListProps) {
  return (
    <div className="flex flex-col w-full gap-4 sm:gap-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
      <RegionItem
        variant="all"
        label="지역 전체"
        isSelected={!tempSelected || tempSelected === '지역 전체'}
        onClick={() => onSelectRegion('지역 전체')}
      />

      <Accordion
        value={expandedProvince ? [expandedProvince] : []}
        onValueChange={(val) => {
          const selected = Array.isArray(val) ? val[0] : val;
          onToggleExpand(selected || '');
        }}
        className="flex flex-col gap-4 sm:gap-6"
      >
        {REGIONS.map((region) => (
          <RegionGroup
            key={region.province}
            region={region}
            tempSelected={tempSelected}
            onSelectCity={onSelectRegion}
          />
        ))}
      </Accordion>
    </div>
  );
}
