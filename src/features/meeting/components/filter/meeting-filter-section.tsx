'use client';

import { useQueryState } from 'nuqs';
import { meetingSearchParams } from '@/features/meeting/schema/meeting-search-params';
import { CategoryTabs } from './category-tabs';
import { RegionFilter } from './region-filter';
import { DateFilter } from './date-filter';
import { SortFilter } from './sort-filter';

export function MeetingFilterSection() {
  const [type, setType] = useQueryState('type', meetingSearchParams.type);

  return (
    <div className="flex items-center justify-between py-4">
      <CategoryTabs
        activeCategory={type}
        onSelectCategory={(selectedType) => setType(selectedType)}
      />
      <div className="flex items-center justify-end gap-2 shrink-0">
        <DateFilter />
        <RegionFilter />
        <SortFilter />
      </div>
    </div>
  );
}
