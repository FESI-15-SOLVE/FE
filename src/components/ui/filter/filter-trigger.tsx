import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconFilter, IconChevronDown } from "@/components/icons";
import { Button } from "@/components/ui/button";

const filterTriggerVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-0.5 px-2 py-1 font-sans font-medium transition-colors select-none outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      size: {
        sm: "text-sm leading-5 tracking-[-0.28px] [&_svg]:size-4",
        lg: "text-base leading-6 tracking-[-0.32px] [&_svg]:size-4.5",
        responsive:
          "text-sm leading-5 tracking-[-0.28px] md:text-base md:leading-6 md:tracking-[-0.32px] [&_svg]:size-4 md:[&_svg]:size-4.5",
      },
      isSelected: {
        true: "text-slate-700 font-semibold",
        false: "text-slate-600 hover:text-slate-700 ",
      },
    },
    defaultVariants: {
      size: "responsive",
      isSelected: false,
    },
  },
);

export interface FilterTriggerProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterTriggerVariants> {
  children?: React.ReactNode;
  mode?: "filter" | "sort";
  leftIcon?: React.ReactNode | boolean;
  rightIcon?: React.ReactNode | boolean;
}

export function FilterTrigger({
  className,
  size,
  isSelected = false,
  children,
  mode = "filter",
  leftIcon,
  rightIcon,
  ...props
}: FilterTriggerProps) {
  const defaultLeft = mode === "sort";
  const defaultRight = mode === "filter";

  const showLeft = leftIcon ?? defaultLeft;
  const showRight = rightIcon ?? defaultRight;

  return (
    <Button
      type="button"
      variant={"custom"}
      size={"custom"}
      aria-expanded={isSelected ?? undefined}
      className={cn(filterTriggerVariants({ size, isSelected, className }))}
      {...props}
    >
      {showLeft === true ? (
        <IconFilter className="shrink-0 text-current" aria-hidden="true" />
      ) : (
        showLeft && showLeft
      )}
      {children && <span>{children}</span>}
      {showRight === true ? (
        <IconChevronDown className="shrink-0 text-current" aria-hidden="true" />
      ) : (
        showRight && showRight
      )}
    </Button>
  );
}

export { filterTriggerVariants };
export default FilterTrigger;
