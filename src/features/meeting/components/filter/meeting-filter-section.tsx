'use client';

import { useQueryStates } from 'nuqs';
import { meetingSearchParams } from '@/features/meeting/schema';
import { CategoryTabs } from './category-tabs';
import { MeetingFilterBar } from './meeting-filter-bar';

export function MeetingFilterSection() {
  const [filters, setFilters] = useQueryStates(meetingSearchParams);

  return (
    <div className="flex flex-col gap-3">
      <CategoryTabs
        activeCategory={filters.type}
        onSelectCategory={(type) => setFilters({ type })}
      />
      <MeetingFilterBar
        region={filters.region}
        date={filters.date}
        sortBy={filters.sortBy}
        onRegionChange={(region) => setFilters({ region })}
        onDateChange={(date) => setFilters({ date })}
        onSortChange={(sortBy) => setFilters({ sortBy })}
      />
    </div>
  );
}
