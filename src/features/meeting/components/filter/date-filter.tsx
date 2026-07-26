'use client';

import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { format, parseISO } from 'date-fns';
import { meetingSearchParams } from '@/features/meeting/schema';
import { FilterTrigger } from '@/components/ui/filter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@/components/ui/calendar/date-picker';

export function DateFilter() {
  const [dateStr, setDateStr] = useQueryState('date', meetingSearchParams.date);
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = dateStr ? parseISO(dateStr) : undefined;
  const displayDate = selectedDate
    ? format(selectedDate, 'M월 d일')
    : '날짜 전체';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <FilterTrigger mode="filter" isSelected={!!dateStr}>
          {displayDate}
        </FilterTrigger>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none bg-transparent shadow-none"
        align="end"
      >
        <DatePicker
          defaultDate={selectedDate}
          onApply={(date) => {
            setDateStr(date ? format(date, 'yyyy-MM-dd') : '');
            setIsOpen(false);
          }}
          onReset={() => {
            setDateStr('');
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
