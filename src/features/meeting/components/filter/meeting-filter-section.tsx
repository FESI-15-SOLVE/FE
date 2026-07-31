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
    <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <CategoryTabs
          activeCategory={type}
          onSelectCategory={(selectedType) => setType(selectedType)}
        />
      </div>
      <div className="flex items-center justify-end gap-2 shrink-0">
        <DateFilter />
        <RegionFilter />
        <SortFilter />
      </div>
    </div>
  );
}
