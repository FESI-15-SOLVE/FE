import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Button } from "@/components/ui/button";

import { IconHeart } from "@/components/icons";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const wishButtonVariants = cva(
  "bg-white rounded-full border-1 border-slate-200 [&_svg]:shrink-0 [&_svg]:transition-transform active:[&_svg]:scale-10 aria-pressed:[&_svg]:scale-100",
  {
    variants: {
      size: {
        small: "size-10",
        medium: "size-12",
        large: "size-15",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

interface WishButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof wishButtonVariants> {
  isWished: boolean;
}

export default function WishButton({
  className,
  size,
  isWished,
  ...props
}: WishButtonProps) {
  const iconSize =
    size === "medium" ? "size-6" : size === "large" ? "size-8" : "size-5";

  const emptyHeart = "stroke-slate-400 stroke-2 text-white";
  const fullHeart =
    "stroke-2 text-gradient-start-500 stroke-gradient-start-500";
  return (
    <Button
      {...props}
      variant="custom"
      size="custom"
      aria-pressed={isWished}
      aria-label={isWished ? "찜 취소" : "찜하기"}
      className={cn(wishButtonVariants({ size }), className)}
    >
      <IconHeart className={cn(iconSize, isWished ? fullHeart : emptyHeart)} />
    </Button>
  );
}
