import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full bg-gray-50 text-neutral-800 placeholder-neutral-400 border border-transparent rounded-xl outline-none focus:border-brand-500 focus:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      inputSize: {
        lg: 'h-12 px-3 text-base',
        sm: 'h-10 px-3 text-sm',
      },
      destructive: {
        true: 'border-danger-500 focus:border-danger-500',
        false: '',
      },
    },
    defaultVariants: {
      inputSize: 'lg',
      destructive: false,
    },
  },
);

export interface InputProps
  extends
    Omit<React.ComponentProps<typeof InputPrimitive>, 'size'>,
    VariantProps<typeof inputVariants> {
  ref?: React.Ref<HTMLInputElement>;
  rightIcon?: React.ReactNode;
}

function Input({
  className,
  type = 'text',
  rightIcon,
  inputSize,
  destructive,
  ref,
  ...props
}: InputProps) {
  const input = (
    <InputPrimitive
      type={type}
      ref={ref}
      className={cn(
        inputVariants({ inputSize, destructive, className }),
        rightIcon && 'pr-10',
      )}
      {...props}
    />
  );

  if (!rightIcon) {
    return input;
  }

  return (
    <div className="relative w-full flex items-center">
      {input}
      <div className="absolute right-3 flex items-center justify-center text-neutral-400">
        {rightIcon}
      </div>
    </div>
  );
}

export { Input, inputVariants };
