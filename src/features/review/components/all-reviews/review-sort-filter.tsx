'use client';

import { useState } from 'react';
import { useQueryStates } from 'nuqs';
import { Check } from 'lucide-react';
import { FilterTrigger } from '@/components/ui/filter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { reviewSearchParams } from '../../schema/review-search-params';
import { ReviewSortBy, SortOrder } from '../../schema/review-query-schema';

type SortOption = {
  sortBy: ReviewSortBy;
  sortOrder: SortOrder;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { sortBy: 'createdAt', sortOrder: 'desc', label: '최신순' },
  { sortBy: 'score', sortOrder: 'desc', label: '리뷰 높은순' },
  { sortBy: 'participantCount', sortOrder: 'desc', label: '참여 인원순' },
];

export function ReviewSortFilter() {
  const [sortStates, setSortStates] = useQueryStates({
    sortBy: reviewSearchParams.sortBy,
    sortOrder: reviewSearchParams.sortOrder,
  });

  const [isOpen, setIsOpen] = useState(false);

  const activeOption =
    SORT_OPTIONS.find(
      (opt) =>
        opt.sortBy === sortStates.sortBy && opt.sortOrder === sortStates.sortOrder,
    ) || SORT_OPTIONS[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <FilterTrigger mode="sort" isSelected={!!sortStates.sortBy}>
            {activeOption.label}
          </FilterTrigger>
        }
      />
      <PopoverContent className="w-36 p-1" align="end">
        <div className="flex flex-col gap-0.5">
          {SORT_OPTIONS.map((option) => {
            const isActive =
              (sortStates.sortBy || 'createdAt') === option.sortBy &&
              (sortStates.sortOrder || 'desc') === option.sortOrder;

            return (
              <button
                key={`${option.sortBy}-${option.sortOrder}`}
                type="button"
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-slate-50 font-semibold text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => {
                  setSortStates({
                    sortBy: option.sortBy,
                    sortOrder: option.sortOrder,
                  });
                  setIsOpen(false);
                }}
              >
                {option.label}
                {isActive && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
