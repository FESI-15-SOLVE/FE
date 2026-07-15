import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import icGoogle from "@/assets/svg/ic-google.svg";
import icKakao from "@/assets/svg/ic-kakao.svg";
import { cn } from "@/lib/utils";

const socialButtonIcons = {
  google: icGoogle,
  kakao: icKakao,
};

const socialButtonVariants = cva(
  "group/button gap-[12px] flex w-[100%] inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        google: "bg-background bg-white text-slate-800",
        kakao: "bg-background bg-[#FFEE01] text-slate-800",
      },
      size: {
        default: "h-[40px] px-[16px] rounded-[10px] text-sm",
        md: "h-[48px] px-[16px] rounded-[12px] text-base",
        lg: "h-[60px] px-[16px] rounded-[16px] text-xl",
      },
    },
    defaultVariants: {
      variant: "google",
      size: "default",
    },
  },
);

interface SocialButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof socialButtonVariants> {}

export default function SocialButton({
  className,
  variant = "google",
  size = "default",
  ...props
}: SocialButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(socialButtonVariants({ variant, size, className }))}
    >
      <Image src={socialButtonIcons[variant ?? "google"]} alt="" />
      {props.children}
    </ButtonPrimitive>
  );
}
