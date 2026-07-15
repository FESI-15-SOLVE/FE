import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import icHeartFull from "@/assets/svg/ic-heart-full.svg";
import icHeartEmpty from "@/assets/svg/ic-heart-empty.svg";
import { cn } from "@/lib/utils";

const wishButtonVariants = cva(
  "group/button transition-all rounded-[50px] bg-white inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50  disabled:pointer-events-none [&_img]:shrink-0 [&_img]:transition-transform active:[&_img]:scale-75 aria-pressed:[&_img]:scale-110",
  {
    variants: {
      size: {
        default: "h-[40px] w-[40px] [&_img]:size-[20px]",
        md: "h-[48px] w-[48px] [&_img]:size-[24px]",
        lg: "h-[60px] w-[60px] [&_img]:size-[32px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface WishButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof wishButtonVariants> {
  isWished: boolean;
}

export default function WishButton({
  className,
  size = "default",
  isWished,
  ...props
}: WishButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(wishButtonVariants({ size, className }))}
      {...props}
    >
      <Image src={isWished ? icHeartFull : icHeartEmpty} alt="찜 버튼" />
    </ButtonPrimitive>
  );
}
