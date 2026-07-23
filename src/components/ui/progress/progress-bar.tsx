import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./progress";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current?: number;
  total?: number;
  showIcon?: boolean;
  showCounter?: boolean;
  valueText?: string;
}

export function ProgressBar({
  className,
  current = 4,
  total = 20,
  showIcon = true,
  showCounter = true,
  valueText,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: ProgressBarProps) {
  const displayTotal = Math.max(0, total);
  const safeTotal = displayTotal || 1;
  const safeCurrent = Math.max(0, Math.min(current, displayTotal));
  const defaultAriaValueText = `${safeCurrent} / ${displayTotal}명 참여`;

  return (
    <div
      className={cn(
        "inline-flex w-full items-center justify-between gap-3 font-sans text-sm select-none",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1.5">
        {showIcon && (
          <User className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
        )}
        <Progress
          value={safeCurrent}
          max={safeTotal}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-valuetext={valueText ?? defaultAriaValueText}
          className="**:data-[slot=progress-indicator]:from-gradient-start-500 **:data-[slot=progress-indicator]:to-gradient-end-500 flex-1 gap-0 **:data-[slot=progress-indicator]:rounded-full **:data-[slot=progress-indicator]:bg-linear-to-r **:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-track]:bg-slate-200"
        />
      </div>

      {showCounter && (
        <div className="shrink-0 text-right leading-5 font-medium whitespace-nowrap">
          <span className="font-semibold tracking-tight text-green-500">
            {safeCurrent}
          </span>
          <span className="text-slate-600">/{displayTotal}</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
