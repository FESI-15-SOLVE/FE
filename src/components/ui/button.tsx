import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "text-white bg-green-500 hover:bg-green-600 disabled:text-slate-600 disabled:bg-slate-100",
        secondary:
          "bg-background bg-white text-green-600 border-1 border-green-500 ",
        tertiary:
          "bg-background bg-white text-slate-600 border-1  border-slate-200",
        custom: "",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      },
      size: {
        default:
          "h-10 md:h-12 lg:h-15 px-4 rounded-lg md:rounded-12 lg:rounded-16 text-sm md:text-base lg:text-xl",
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-4 rounded-12 text-base",
        lg: "h-15 px-4 rounded-16 text-xl",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
