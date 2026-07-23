import * as React from 'react';
import { Field, FieldLabel, FieldContent, FieldError } from '@/components/ui/field';

export interface InputFieldProps {
  label?: React.ReactNode;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function InputField({
  label,
  required,
  error,
  children,
  className,
}: InputFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      {label && (
        <FieldLabel className="flex items-center gap-0.5 font-medium text-neutral-800">
          {label} {required && <span className="text-brand-500">*</span>}
        </FieldLabel>
      )}
      <FieldContent>{children}</FieldContent>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

export { InputField };
