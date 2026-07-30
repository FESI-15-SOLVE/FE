'use client';

import { useState } from 'react';
import { useQueryStates } from 'nuqs';
import { Check } from 'lucide-react';
import { meetingSearchParams } from '@/features/meeting/schema/meeting-search-params';
import { FilterTrigger } from '@/components/ui/filter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SortBy, SortOrder } from '@/features/meeting/schema/meeting-query-schema';

type SortOption = {
  sortBy: SortBy;
  sortOrder: SortOrder | null;
  label: string;
};

const SORT_OPTIONS: SortOption[] = [
  { sortBy: 'registrationEnd', sortOrder: null, label: '마감 임박' },
  { sortBy: 'participantCount', sortOrder: 'desc', label: '참여 인원순' },
];

export function SortFilter() {
  const [sortStates, setSortStates] = useQueryStates({
    sortBy: meetingSearchParams.sortBy,
    sortOrder: meetingSearchParams.sortOrder,
  });
  
  const [isOpen, setIsOpen] = useState(false);

  // 현재 활성화된 옵션 찾기
  const activeOption =
    SORT_OPTIONS.find(
      (opt) =>
        opt.sortBy === sortStates.sortBy && opt.sortOrder === sortStates.sortOrder
    ) || SORT_OPTIONS[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <FilterTrigger mode="sort" isSelected={sortStates.sortBy !== 'dateTime'}>
            {activeOption.label}
          </FilterTrigger>
        }
      />
      <PopoverContent className="w-40 p-1" align="end">
        <div className="flex flex-col gap-0.5">
          {SORT_OPTIONS.map((option) => {
            const isActive =
              sortStates.sortBy === option.sortBy &&
              sortStates.sortOrder === option.sortOrder;

            return (
              <button
                key={`${option.sortBy}-${option.sortOrder || 'default'}`}
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
