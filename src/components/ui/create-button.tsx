import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import icPlus from "@/assets/svg/ic-plus.svg";
import { cn } from "@/lib/utils";

const createButtonVariants = cva(
  "group/button gap-[6px] flex inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        default: "h-[48px] w-[48px] rounded-[50px] bg-green-500",
        lg: "h-[64px] w-[188px] rounded-[16px] text-xl text-white bg-green-500",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface CreateButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof createButtonVariants> {}

export default function CreateButton({
  className,
  size = "default",
  ...props
}: CreateButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(createButtonVariants({ size, className }))}
    >
      <Image src={icPlus} alt="생성 버튼" />
      {size === "lg" && props.children}
    </ButtonPrimitive>
  );
}
