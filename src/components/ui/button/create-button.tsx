import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import IconPlus from '@/assets/icons/plus.svg';
import { Button } from './button';

const createButtonVariants = cva('font-bold transition-all', {
  variants: {
    size: {
      lg: 'rounded-3xl h-16 px-7 py-4 w-47 text-xl gap-1.5',
      sm: 'rounded-full size-12 px-0 py-0 justify-center',
      responsive:
        'rounded-full size-12 px-0 py-0 justify-center md:rounded-3xl md:h-16 md:px-7 md:py-4 md:w-47 md:text-xl md:gap-1.5',
    },
  },
  defaultVariants: {
    size: 'responsive',
  },
});

export interface CreateButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof createButtonVariants> {
  children?: React.ReactNode;
}

export function CreateButton({
  className,
  size = 'responsive',
  children,
  ...props
}: CreateButtonProps) {
  return (
    <Button
      variant="primary"
      className={cn(createButtonVariants({ size }), className)}
      {...props}
    >
      <IconPlus className="shrink-0 size-8" />
      {size === 'lg' && children}
      {size === 'responsive' && (
        <span className="hidden md:inline whitespace-nowrap">{children}</span>
      )}
    </Button>
  );
}
