import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const primaryButtonVariants = cva(
  "group/button w-[100%] inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-white bg-green-500 hover:bg-green-600 disabled:text-slate-600 disabled:bg-slate-100",
        secondary:
          "border-border bg-background bg-white text-green-600 border-1 border-green-500 ",
        tertiary:
          "border-border bg-background bg-white text-slate-600 border-1  border-slate-200",
      },
      size: {
        default: "h-[40px] px-[16px] rounded-[10px] text-sm",
        md: "h-[48px] px-[16px] rounded-[12px] text-base",
        lg: "h-[60px] px-[16px] rounded-[16px] text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface PrimaryButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof primaryButtonVariants> {
  onClick?: () => void;
}

export default function PrimaryButton({
  onClick,
  className,
  variant = "default",
  size = "default",
  ...props
}: PrimaryButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(primaryButtonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    />
  );
}
