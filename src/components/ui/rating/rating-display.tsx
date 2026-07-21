import type { ComponentType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconHeart } from "@/components/icons";

export const ratingVariants = cva(
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

export interface RatingDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratingVariants> {
  score?: number;
  maxScore?: number;
  /** 커스텀 평가 아이콘 컴포넌트 (기본값: IconHeart) */
  icon?: ComponentType<React.ComponentProps<"svg">>;
}

/** 읽기 전용 평점 표시 컴포넌트 (Server Component) */
export function RatingDisplay({
  className,
  size,
  maxScore = 5,
  score = maxScore,
  icon: Icon = IconHeart,
  ...props
}: RatingDisplayProps) {
  return (
    <div
      className={cn(ratingVariants({ size, className }))}
      role="img"
      aria-label={`평점 ${score}점 (만점 ${maxScore}점)`}
      {...props}
    >
      {Array.from({ length: Math.max(1, maxScore) }, (_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= Math.round(score);

        return (
          <Icon
            key={ratingValue}
            className={cn(
              "size-auto shrink-0",
              isFilled ? "text-green-500" : "text-slate-200",
            )}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default RatingDisplay;
