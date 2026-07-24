import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Button } from "@/components/ui/button";

import { IconHeartEmpty, IconHeartFull } from "@/components/icons";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const wishButtonVariants = cva(
  "bg-white rounded-full [&_svg]:shrink-0 [&_svg]:transition-transform active:[&_svg]:scale-75 aria-pressed:[&_svg]:scale-110",
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
  const Icon = isWished ? IconHeartFull : IconHeartEmpty;
  const iconSize =
    size === "medium" ? "size-6" : size === "large" ? "size-8" : "size-5";

  return (
    <Button
      {...props}
      variant="custom"
      size="custom"
      aria-pressed={isWished}
      aria-label={isWished ? "찜 취소" : "찜하기"}
      className={cn(wishButtonVariants({ size }), className)}
    >
      <Icon className={iconSize} />
    </Button>
  );
}
