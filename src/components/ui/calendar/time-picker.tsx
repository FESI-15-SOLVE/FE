"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useScrollToCenter } from "@/hooks/ui";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function getMinutes(step: number) {
  if (!Number.isInteger(step) || step <= 0 || step > 60) {
    throw new RangeError("minusStep은 1과 60 사이의 정수여야합니다.");
  }
  return Array.from({ length: Math.floor(60 / step) }, (_, i) => i * step);
}
export interface TimePickerProps {
  hour?: number;
  minute?: number;
  minuteStep?: number;
  onHourChange?: (hour: number) => void;
  onMinuteChange?: (minute: number) => void;
  className?: string;
}

interface TimeColumnProps {
  items: number[];
  selected: number;
  label: string;
  onSelect: (value: number) => void;
}

function TimeColumn({ items, selected, label, onSelect }: TimeColumnProps) {
  const { selectedRef, containerRef } = useScrollToCenter<
    HTMLButtonElement,
    HTMLDivElement
  >(selected);

  return (
    <div
      ref={containerRef}
      role="listbox"
      aria-label={label}
      className="relative flex h-full flex-col gap-2.5 overflow-y-auto px-2 py-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb:hover]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent"
    >
      {items.map((item) => {
        const isSelected = item === selected;
        return (
          <Button
            key={item}
            ref={isSelected ? selectedRef : null}
            variant={"custom"}
            size={"custom"}
            role="option"
            aria-selected={isSelected}
            aria-label={`${item}${label}`}
            type="button"
            onClick={() => onSelect(item)}
            className={cn(
              "flex h-8.25 w-10.5 shrink-0 items-center justify-center rounded-lg text-sm transition-colors",
              isSelected
                ? "bg-green-200 font-semibold tracking-tight text-green-600"
                : "font-medium text-slate-900 hover:bg-slate-100",
            )}
          >
            {item.toString().padStart(2, "0")}
          </Button>
        );
      })}
    </div>
  );
}

export function TimePicker({
  hour = 0,
  minute = 0,
  minuteStep = 5,
  onHourChange,
  onMinuteChange,
  className,
}: TimePickerProps) {
  const minutes = getMinutes(minuteStep);

  // 부모로부터 유효하지 않은 값(범위 이탈 등)이 올 경우 UI가 깨지지 않도록 안전한 값으로 폴백
  const safeHour = HOURS.includes(hour) ? hour : 0;
  const safeMinute = minutes.includes(minute) ? minute : 0;

  return (
    <div
      className={cn(
        "flex h-66.5 items-center gap-2.5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3",
        className,
      )}
    >
      <TimeColumn
        items={HOURS}
        label="시"
        selected={safeHour}
        onSelect={(h) => onHourChange?.(h)}
      />
      <div className="h-full w-px bg-slate-200" />
      <TimeColumn
        items={minutes}
        label="분"
        selected={safeMinute}
        onSelect={(m) => onMinuteChange?.(m)}
      />
    </div>
  );
}
