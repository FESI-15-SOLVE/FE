import * as React from 'react';
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';

export interface InputFieldProps {
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function InputField({
  id,
  label,
  required,
  error,
  children,
  className,
}: InputFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      {label && (
        <FieldLabel htmlFor={id} className="flex items-center gap-0.5 font-medium text-neutral-800">
          {label} {required && <span className="text-green-500">*</span>}
        </FieldLabel>
      )}
      <FieldContent>{children}</FieldContent>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

export { InputField };
