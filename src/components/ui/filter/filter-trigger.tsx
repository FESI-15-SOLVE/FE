import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconFilter } from "@/components/icons";
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
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof filterTriggerVariants> {
  value: string | string[];
  defaultValue: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | boolean;
}

export function FilterTrigger({
  className,
  size,
  isSelected = false,
  value,
  defaultValue,
  children,
  icon = true,
  ...props
}: FilterTriggerProps) {
  const formattedValue = Array.isArray(value)
    ? value.length > 0
      ? value.join(", ")
      : defaultValue
    : (value ?? defaultValue);

  const displayValue = children ?? formattedValue;

  return (
    <Button
      type="button"
      variant={"custom"}
      size={"custom"}
      aria-pressed={isSelected ?? undefined}
      className={cn(filterTriggerVariants({ size, isSelected, className }))}
      {...props}
    >
      {icon === true ? (
        <IconFilter className="shrink-0 text-current" aria-hidden="true" />
      ) : (
        icon
      )}
      {displayValue && <span>{displayValue}</span>}
    </Button>
  );
}

export { filterTriggerVariants };
export default FilterTrigger;
