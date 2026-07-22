"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function getMinutes(step: number) {
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
  onSelect: (value: number) => void;
}

function TimeColumn({ items, selected, onSelect }: TimeColumnProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [selected]);

  return (
    <div className="flex h-full flex-col gap-2.5 overflow-y-auto px-2 py-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb:hover]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent">
      {items.map((item) => {
        const isSelected = item === selected;
        return (
          <button
            key={item}
            ref={isSelected ? selectedRef : null}
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
          </button>
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

  return (
    <div
      className={cn(
        "flex h-66.5 items-center gap-2.5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3",
        className,
      )}
    >
      <TimeColumn
        items={HOURS}
        selected={hour}
        onSelect={(h) => onHourChange?.(h)}
      />
      <div className="h-full w-px bg-slate-200" />
      <TimeColumn
        items={minutes}
        selected={minute}
        onSelect={(m) => onMinuteChange?.(m)}
      />
    </div>
  );
}
