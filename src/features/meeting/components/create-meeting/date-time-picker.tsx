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
  value?: Date;
  onChange: (date?: Date) => void;
  error?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  error,
}: DateTimePickerProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      <div className="relative flex-1">
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger
            aria-label="날짜 선택"
            className={cn(
              'flex h-11 w-full rounded-xl border border-neutral-200 bg-page-bg px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none text-left cursor-pointer transition-all items-center justify-between hover:bg-neutral-100/50',
              !value && 'text-neutral-400',
              error && 'border-danger-500',
            )}
          >
            <span className="truncate">
              {value ? format(value, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
            </span>
            <CalendarIcon className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <DatePicker
              defaultDate={value}
              onApply={(date) => {
                if (date) {
                  const newDate = value ? new Date(value) : new Date();
                  newDate.setFullYear(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                  );
                  onChange(newDate);
                } else {
                  onChange(undefined);
                }
                setIsDateOpen(false);
              }}
              onReset={() => {
                onChange(undefined);
                setIsDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 시간 입력 */}
      <div className="relative flex-1">
        <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
          <PopoverTrigger
            aria-label="시간 선택"
            className={cn(
              'flex h-11 w-full rounded-xl border border-neutral-200 bg-page-bg px-4 py-3 text-sm text-neutral-800 outline-none text-left cursor-pointer transition-all items-center justify-between hover:bg-neutral-100/50',
              !value && 'text-neutral-400',
              error && 'border-danger-500',
            )}
          >
            <span className="truncate">
              {value ? format(value, 'HH : mm') : '00 : 00'}
            </span>
            <Clock className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <TimePicker
              hour={value?.getHours() ?? 0}
              minute={value?.getMinutes() ?? 0}
              onHourChange={(h) => {
                const newDate = value ? new Date(value) : new Date();
                newDate.setHours(h);
                onChange(newDate);
              }}
              onMinuteChange={(m) => {
                const newDate = value ? new Date(value) : new Date();
                newDate.setMinutes(m);
                onChange(newDate);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
