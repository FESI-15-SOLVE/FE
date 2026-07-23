import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textAreaVariants = cva(
  'w-full h-[120px] bg-gray-50 text-neutral-800 placeholder-neutral-400 border border-transparent rounded-xl p-3 outline-none resize-none focus:border-brand-500 focus:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      inputSize: {
        lg: 'text-base',
        sm: 'text-sm',
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

export interface TextAreaProps
  extends
    Omit<React.ComponentProps<'textarea'>, 'size'>,
    VariantProps<typeof textAreaVariants> {
  ref?: React.Ref<HTMLTextAreaElement>;
}


function TextArea({
  className,
  inputSize,
  destructive,
  ref,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(textAreaVariants({ inputSize, destructive, className }))}
      {...props}
    />
  );
}

export { TextArea, textAreaVariants };
export { TextArea as Textarea };
