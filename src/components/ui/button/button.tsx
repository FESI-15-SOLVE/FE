import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'hover:cursor-pointer inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-600 disabled:border-transparent',
  {
    variants: {
      variant: {
        primary: 'bg-green-500 text-white hover:bg-green-600',
        secondary:
          'bg-white border border-green-500 text-green-600 hover:bg-green-50',
        tertiary:
          'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 text-slate-600',
        destructive: 'bg-error-500 text-white hover:bg-red-600',
        link: 'text-green-500 underline-offset-4 hover:underline',
        custom: '',
      },
      size: {
        lg: 'h-15 px-7.5 py-4 rounded-2xl text-xl',
        md: 'h-12 px-6 py-2 rounded-xl text-base',
        sm: 'h-10 px-4 py-2.5 rounded-lg text-sm',
        'icon-lg': 'size-15 rounded-2xl',
        icon: 'size-12 rounded-xl',
        'icon-sm': 'size-10 rounded-lg',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
