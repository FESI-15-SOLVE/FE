'use client';

import { useQueryState } from 'nuqs';
import { CategoryTabs } from '@/features/meeting/components/filter/category-tabs';
import { RegionFilter } from '@/features/meeting/components/filter/region-filter';
import { DateFilter } from '@/features/meeting/components/filter/date-filter';
import { reviewSearchParams } from '../../schema/review-search-params';
import { ReviewSortFilter } from './review-sort-filter';

export function AllReviewsFilterSection() {
  const [type, setType] = useQueryState('type', reviewSearchParams.type);

  return (
    <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between w-full">
      <div className="min-w-0 flex-1">
        <CategoryTabs
          activeCategory={type}
          onSelectCategory={(selectedType) => setType(selectedType)}
        />
      </div>
      <div className="flex items-center justify-end gap-2 shrink-0">
        <DateFilter />
        <RegionFilter />
        <ReviewSortFilter />
      </div>
    </div>
  );
}
