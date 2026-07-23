import * as React from 'react';
import { cn } from '@/lib/utils';
import { TextArea, type TextAreaProps } from './textarea';
import { Label } from './label';

export interface TextAreaFieldProps extends TextAreaProps {
  label?: string;
  required?: boolean;
  helperText?: string;
}

function TextAreaField({
  label,
  required,
  helperText,
  destructive,
  inputSize,
  className,
  id,
  ...props
}: TextAreaFieldProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-0.5 pl-1">
          <span
            className={cn(
              'font-medium text-neutral-800',
              inputSize === 'sm' ? 'text-sm leading-5' : 'text-base leading-6',
            )}
          >
            {label}
          </span>
          {required && (
            <span
              className={cn(
                'font-medium text-brand-500',
                inputSize === 'sm'
                  ? 'text-sm leading-5'
                  : 'text-base leading-6',
              )}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </Label>
      )}

      <TextArea
        id={inputId}
        destructive={destructive}
        inputSize={inputSize}
        className={className}
        {...props}
      />

      {helperText && (
        <div className="pl-1">
          <p
            className={cn(
              'font-medium',
              inputSize === 'sm' ? 'text-xs leading-4' : 'text-sm leading-5',
              destructive ? 'text-danger-500' : 'text-neutral-400',
            )}
          >
            {helperText}
          </p>
        </div>
      )}
    </div>
  );
}

export { TextAreaField };
