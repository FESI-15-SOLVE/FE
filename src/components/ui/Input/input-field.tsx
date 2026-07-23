import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input, type InputProps } from './input';
import { Label } from './label';

export interface InputFieldProps extends InputProps {
  label?: string;
  required?: boolean;
  helperText?: string;
}

function InputField({
  label,
  required,
  helperText,
  destructive,
  inputSize,
  className,
  id,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-0.5 pl-1">
          <span className="text-sm font-medium text-neutral-800 leading-5">
            {label}
          </span>
          {required && (
            <span
              className="text-sm font-medium text-brand-500 leading-5"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </Label>
      )}

      <Input
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
              destructive ? 'text-error-500' : 'text-neutral-400',
            )}
          >
            {helperText}
          </p>
        </div>
      )}
    </div>
  );
}

export { InputField };
