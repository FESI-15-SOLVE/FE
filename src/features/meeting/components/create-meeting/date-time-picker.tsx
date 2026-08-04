'use client';

import { useState, useEffect } from 'react';
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

  // 날짜와 시간 상태를 완전히 독립적으로 분리 관리
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [selectedTime, setSelectedTime] = useState<{
    hour: number;
    minute: number;
  } | undefined>(
    value
      ? { hour: value.getHours(), minute: value.getMinutes() }
      : undefined,
  );

  // 외부 valueProp 변경 및 폼 reset 시 상태 동기화
  useEffect(() => {
    setSelectedDate(value);
    if (value) {
      setSelectedTime({ hour: value.getHours(), minute: value.getMinutes() });
    } else {
      setSelectedTime(undefined);
    }
  }, [value]);

  // 날짜 선택 적용 시
  const handleDateApply = (date?: Date) => {
    if (!date) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      onChange(undefined);
      setIsDateOpen(false);
      return;
    }

    setSelectedDate(date);
    const hour = selectedTime?.hour ?? 0;
    const minute = selectedTime?.minute ?? 0;

    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      minute,
      0,
      0,
    );
    onChange(combinedDate);
    setIsDateOpen(false);
  };

  // 시간 선택 시 (시간을 먼저 골라도 오늘 날짜가 강제로 박히지 않음)
  const handleTimeChange = (newHour?: number, newMinute?: number) => {
    const hour = newHour ?? selectedTime?.hour ?? 0;
    const minute = newMinute ?? selectedTime?.minute ?? 0;
    const nextTime = { hour, minute };

    setSelectedTime(nextTime);

    // 날짜가 이미 선택되어 있는 경우에만 조합된 Date 객체 발송
    if (selectedDate) {
      const combinedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute,
        0,
        0,
      );
      onChange(combinedDate);
    }
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      {/* 날짜 입력 */}
      <div className="relative flex-1">
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger
            aria-label="날짜 선택"
            className={cn(
              'flex h-11 w-full rounded-xl border border-neutral-200 bg-page-bg px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 outline-none text-left cursor-pointer transition-all items-center justify-between hover:bg-neutral-100/50',
              !selectedDate && 'text-neutral-400',
              error && 'border-danger-500',
            )}
          >
            <span className="truncate">
              {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'YYYY-MM-DD'}
            </span>
            <CalendarIcon className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <DatePicker
              defaultDate={selectedDate}
              onApply={handleDateApply}
              onReset={() => {
                setSelectedDate(undefined);
                setSelectedTime(undefined);
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
              !selectedTime && 'text-neutral-400',
              error && 'border-danger-500',
            )}
          >
            <span className="truncate font-mono">
              {selectedTime
                ? `${String(selectedTime.hour).padStart(2, '0')} : ${String(selectedTime.minute).padStart(2, '0')}`
                : '00 : 00'}
            </span>
            <Clock className="size-5 text-neutral-400 shrink-0" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none z-50">
            <TimePicker
              hour={selectedTime?.hour ?? 0}
              minute={selectedTime?.minute ?? 0}
              onHourChange={(h) => handleTimeChange(h, undefined)}
              onMinuteChange={(m) => handleTimeChange(undefined, m)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
