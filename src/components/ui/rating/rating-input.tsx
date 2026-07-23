"use client";

import type { ComponentType, HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconHeart } from "@/components/icons";
import { useHoverPreview } from "@/hooks/ui";
import { Button } from "@/components/ui/button";
import { ratingVariants } from "./rating-display";

import { getSafeRatingScores } from "./utils";

export interface RatingInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  score?: number;
  maxScore?: number;
  /** 커스텀 평가 아이콘 컴포넌트 (기본값: IconHeart). className을 루트 svg에 그대로 적용해야 색상/트랜지션이 반영됩니다. */
  icon?: ComponentType<React.ComponentProps<"svg">>;
  onChange?: (score: number) => void;
}

/** 인터랙티브 평점 입력 컴포넌트 — "use client" 필수 (hover/click/useHoverPreview) */
export function RatingInput({
  className,
  size,
  maxScore,
  score,
  icon: Icon = IconHeart,
  onChange,
  onMouseLeave,
  ...props
}: RatingInputProps) {
  const { safeScore, safeMaxScore } = getSafeRatingScores(score, maxScore);

  const { displayScore, handleItemHover, handleMouseLeave } = useHoverPreview({
    score: safeScore,
  });

  const handleRatingClick = (newScore: number) => {
    onChange?.(newScore);
  };

  return (
    <div
      className={cn(ratingVariants({ size, className }))}
      onMouseLeave={(e) => {
        handleMouseLeave();
        onMouseLeave?.(e);
      }}
      role="radiogroup"
      aria-label="평점 선택"
      {...props}
    >
      {Array.from({ length: safeMaxScore }, (_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= Math.round(displayScore);
        const isChecked = ratingValue === Math.round(safeScore);

        return (
          <Button
            variant={"custom"}
            size={"custom"}
            key={ratingValue}
            type="button"
            role="radio"
            aria-checked={isChecked}
            onClick={() => handleRatingClick(ratingValue)}
            onMouseEnter={() => handleItemHover(index)}
            onFocus={() => handleItemHover(index)}
            onBlur={handleMouseLeave}
            className={cn(
              "focus-visible:ring-ring rounded-full border-0 bg-transparent p-0 transition-transform focus-visible:ring-1 focus-visible:outline-none",
              "cursor-pointer hover:scale-110 active:scale-95",
            )}
            aria-label={`${ratingValue}점`}
          >
            <Icon
              className={cn(
                "size-auto shrink-0 transition-colors duration-150",
                isFilled ? "text-green-500" : "text-slate-200",
              )}
              aria-hidden="true"
            />
          </Button>
        );
      })}
    </div>
  );
}

export default RatingInput;
