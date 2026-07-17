import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import icHeartFull from "@/assets/svg/ic-heart-full.svg";
import icHeartEmpty from "@/assets/svg/ic-heart-empty.svg";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const wishButtonVariants = cva(
  "bg-white rounded-full [&_img]:shrink-0 [&_img]:transition-transform active:[&_img]:scale-75 aria-pressed:[&_img]:scale-110",
  {
    variants: {
      size: {
        small: "h-10 w-10 [&_img]:size-5",
        medium: "h-12 w-12 [&_img]:size-6",
        large: "h-15 w-15 [&_img]:size-8",
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
  return (
    <Button
      variant="custom"
      size="custom"
      aria-pressed={isWished}
      className={cn(wishButtonVariants({ size }), className)}
      {...props}
    >
      <Image src={isWished ? icHeartFull : icHeartEmpty} alt="" />
    </Button>
  );
}
