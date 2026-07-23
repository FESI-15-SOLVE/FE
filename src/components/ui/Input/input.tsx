import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full bg-gray-50 text-neutral-800 placeholder-neutral-400 border rounded-xl outline-none focus:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      inputSize: {
        lg: 'h-12 px-3 text-base',
        sm: 'h-10 px-3 text-sm',
      },
      destructive: {
        true: 'border-error-500 focus:border-error-500',
        false: 'border-transparent focus:border-brand-500',
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Input({
  className,
  type = 'text',
  leftIcon,
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
        leftIcon && 'pl-10',
        rightIcon && 'pr-10',
      )}
      {...props}
    />
  );

  if (!leftIcon && !rightIcon) {
    return input;
  }

  return (
    <div className="relative w-full flex items-center">
      {leftIcon && (
        <div className="absolute left-3 flex items-center justify-center text-neutral-400">
          {leftIcon}
        </div>
      )}
      {input}
      {rightIcon && (
        <div className="absolute right-3 flex items-center justify-center text-neutral-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input, inputVariants };
