"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";

import Calendar from "./calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date?: Date) => void;
  onReset?: () => void;
  onApply?: (date?: Date) => void;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  onReset,
  onApply,
  className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(selectedDate);
  };

  return (
    <div
      className={cn(
        "relative flex w-74.5 flex-col items-center rounded-[12px] border border-slate-100 bg-white p-6 shadow-[0px_10px_5px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={ko}
        formatters={{
          formatCaption: (d, options) => {
            return format(d, "yyyy년 M월", { locale: options?.locale });
          },
        }}
        className="w-full border-none p-0 shadow-none"
      />
      <div className="mt-3 flex w-full justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button type="button" className="flex-1" onClick={handleApply}>
          적용
        </Button>
      </div>
    </div>
  );
}
