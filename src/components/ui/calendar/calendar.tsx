"use client";

import { DayPicker } from "react-day-picker";
import { ChevronDownIcon } from "lucide-react";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";
import ArrowRightIcon from "@/assets/icons/arrow_right.svg";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row",
        month: "flex w-full flex-col  ",
        nav: " absolute inset-x-0 top-0 flex w-full items-center justify-between",
        button_previous:
          "flex items-center justify-center size-8 hover:opacity-70 transition-opacity cursor-pointer z-10 bg-transparent border-none",
        button_next:
          "flex items-center justify-center size-8 text-slate-800 hover:opacity-70 transition-opacity cursor-pointer z-10 bg-transparent border-none",
        month_caption:
          "flex h-8 w-full items-center justify-center font-sans text-sm font-semibold tracking-tight text-slate-800 select-none",
        month_grid: "w-full border-collapse",
        weekdays: "flex w-full",
        weekday:
          "flex-1 flex items-center justify-center font-sans text-sm font-semibold text-slate-600 h-8 select-none",
        week: "flex w-full",
        day: " flex-1 flex items-center justify-center relative p-2.5 w-8 h-8 hover:bg-green-200 rounded-[8px] text-sm",
        selected:
          "text-green-600 font-semibold rounded-lg bg-green-200 hover:bg-green-200",
        today: "text-green-600 font-semibold",
        outside: "text-slate-400 font-medium aria-selected:text-green-600",
        disabled: "text-slate-400 opacity-50 pointer-events-none",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          if (orientation === "left") {
            return (
              <ArrowLeftIcon className={cn("size-5", className)} {...props} />
            );
          }
          if (orientation === "right") {
            return (
              <ArrowRightIcon className={cn("size-5", className)} {...props} />
            );
          }
          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
      }}
      {...props}
    />
  );
}

export default Calendar;
