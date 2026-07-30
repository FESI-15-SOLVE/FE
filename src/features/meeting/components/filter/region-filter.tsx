'use client';

import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { meetingSearchParams } from '@/features/meeting/schema/meeting-search-params';
import { RegionSelectModal } from '@/features/meeting/components/region-select/region-select-modal';
import { FilterTrigger } from '@/components/ui/filter';

export function RegionFilter() {
  const [region, setRegion] = useQueryState('region', meetingSearchParams.region);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FilterTrigger
        mode="filter"
        onClick={() => setIsOpen(true)}
        isSelected={!!region}
      >
        {region || '지역 전체'}
      </FilterTrigger>
      <RegionSelectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedRegion={region || ''}
        onSelect={(selected) => {
          const isAll = !selected || selected === '지역 전체';
          setRegion(isAll ? '' : selected);
          setIsOpen(false);
        }}
      />
    </>
  );
}
