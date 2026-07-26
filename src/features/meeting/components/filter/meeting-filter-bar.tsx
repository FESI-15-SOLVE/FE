'use client';

import React, { useState } from 'react';
import { RegionSelectModal } from '@/features/meeting/components/region-select';
import { SortBy } from '@/features/meeting/schema';

interface MeetingFilterBarProps {
  region: string;
  date: string;
  sortBy: SortBy;
  onRegionChange: (region: string) => void;
  onDateChange: (date: string) => void;
  onSortChange: (sortBy: SortBy) => void;
}

export function MeetingFilterBar({
  region,
  date,
  sortBy,
  onRegionChange,
  onDateChange,
  onSortChange,
}: MeetingFilterBarProps) {
  const [regionModalOpen, setRegionModalOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setRegionModalOpen(true)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
        >
          {region ? region : '지역 선택'}
        </button>

        {date && (
          <button
            onClick={() => onDateChange('')}
            className="px-3 py-1.5 rounded-lg border border-orange-300 bg-orange-50 text-orange-700 text-sm font-medium hover:bg-orange-100 cursor-pointer"
          >
            {date} ✕
          </button>
        )}

        <RegionSelectModal
          isOpen={regionModalOpen}
          onClose={() => setRegionModalOpen(false)}
          selectedRegion={region}
          onSelect={(selected) => {
            const isAll = !selected || selected === '지역 전체';
            onRegionChange(isAll ? '' : selected);
            setRegionModalOpen(false);
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer"
        >
          <option value="dateTime">마감 임박순</option>
          <option value="createdAt">최신순</option>
          <option value="participantCount">참가자 많은순</option>
        </select>
      </div>
    </div>
  );
}
