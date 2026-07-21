import type { ComponentType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconHeart } from "@/components/icons";
import { useHoverPreview } from "@/hooks";
import { Button } from "@/components/ui/button";

const ratingVariants = cva(
  "inline-flex shrink-0 items-center gap-0.5 select-none",
  {
    variants: {
      size: {
        sm: "[&_svg]:size-5",
        md: "[&_svg]:size-6",
        lg: "[&_svg]:size-10",
        responsive: "[&_svg]:size-5 md:[&_svg]:size-10",
      },
    },
    defaultVariants: {
      size: "responsive",
    },
  },
);

export interface RatingProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  score?: number;
  maxScore?: number;
  /** 커스텀 평가 아이콘 컴포넌트 (기본값: IconHeart). className을 루트 svg에 그대로 적용해야 색상/트랜지션이 반영됩니다. */
  icon?: ComponentType<React.ComponentProps<"svg">>;
  readOnly?: boolean;
  onChange?: (score: number) => void;
}

export function Rating({
  className,
  size,
  score = 5,
  maxScore = 5,
  readOnly = true,
  icon: Icon = IconHeart,
  onChange,
  ...props
}: RatingProps) {
  const { displayScore, handleItemHover, handleMouseLeave } = useHoverPreview({
    score,
    readOnly,
  });

  const handleRatingClick = (newScore: number) => {
    if (readOnly) return;
    onChange?.(newScore);
  };

  return (
    <div
      className={cn(ratingVariants({ size, className }))}
      onMouseLeave={handleMouseLeave}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={
        readOnly ? `평점 ${score}점 (만점 ${maxScore}점)` : "평점 선택"
      }
      {...props}
    >
      {Array.from({ length: Math.max(1, maxScore) }, (_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= Math.round(displayScore);
        const isChecked = ratingValue === Math.round(score);

        return (
          <Button
            variant={"custom"}
            size={"custom"}
            key={ratingValue}
            type="button"
            role={readOnly ? undefined : "radio"}
            aria-checked={readOnly ? undefined : isChecked}
            disabled={readOnly}
            onClick={() => handleRatingClick(ratingValue)}
            onMouseEnter={() => handleItemHover(index)}
            onFocus={() => handleItemHover(index)}
            onBlur={handleMouseLeave}
            className={cn(
              "focus-visible:ring-ring rounded-full border-0 bg-transparent p-0 transition-transform focus-visible:ring-1 focus-visible:outline-none",
              !readOnly && "cursor-pointer hover:scale-110 active:scale-95",
              readOnly && "cursor-default",
            )}
            aria-label={`${ratingValue}점`}
            tabIndex={readOnly ? -1 : 0}
          >
            <Icon
              className={cn(
                "shrink-0 transition-colors duration-150",
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

export { ratingVariants };
export default Rating;
