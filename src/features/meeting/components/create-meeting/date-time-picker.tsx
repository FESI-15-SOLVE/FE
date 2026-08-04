'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@/components/ui/calendar/date-picker';
import { TimePicker } from '@/components/ui/calendar/time-picker';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DateTimePickerProps {
  dateValue?: Date;
  onDateChange: (date?: Date) => void;
  timeValue?: { hour: number; minute: number };
  onTimeChange: (time?: { hour: number; minute: number }) => void;
  dateError?: boolean;
  timeError?: boolean;
}

export function DateTimePicker({
  dateValue,
  onDateChange,
  timeValue,
  onTimeChange,
  dateError,
  timeError,
}: DateTimePickerProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      {/* 날짜 선택 */}
      <div className="relative flex-1">
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger
            aria-label="날짜 선택"
            className={cn(
              'flex h-11 w-full rounded-xl border border-neutral-200 bg-page-bg px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none text-left cursor-pointer transition-all items-center justify-between hover:bg-neutral-100/50',
              !dateValue && 'text-neutral-400',
              dateError && 'border-danger-500',
            )}
          >
            <span className="truncate">
              {dateValue ? format(dateValue, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
            </span>
            <CalendarIcon className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <DatePicker
              defaultDate={dateValue}
              onApply={(date) => {
                onDateChange(date);
                setIsDateOpen(false);
              }}
              onReset={() => {
                onDateChange(undefined);
                setIsDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 시간 선택 */}
      <div className="relative flex-1">
        <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
          <PopoverTrigger
            aria-label="시간 선택"
            className={cn(
              'flex h-11 w-full rounded-xl border border-neutral-200 bg-page-bg px-4 py-3 text-sm text-neutral-800 outline-none text-left cursor-pointer transition-all items-center justify-between hover:bg-neutral-100/50',
              !timeValue && 'text-neutral-400',
              timeError && 'border-danger-500',
            )}
          >
            <span className="truncate font-mono">
              {timeValue
                ? `${String(timeValue.hour).padStart(2, '0')} : ${String(timeValue.minute).padStart(2, '0')}`
                : '00 : 00'}
            </span>
            <Clock className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <TimePicker
              hour={timeValue?.hour ?? 0}
              minute={timeValue?.minute ?? 0}
              onHourChange={(h) =>
                onTimeChange({ hour: h, minute: timeValue?.minute ?? 0 })
              }
              onMinuteChange={(m) =>
                onTimeChange({ hour: timeValue?.hour ?? 0, minute: m })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
