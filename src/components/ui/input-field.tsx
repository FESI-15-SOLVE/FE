import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface InputFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "aria-describedby"
> {
  label: string;
  hint?: {
    description: React.ReactNode;
    errorMessage?: React.ReactNode;
  };
}

export function InputField({
  id,
  label,
  hint,
  required = false,
  className,
  "aria-invalid": ariaInvalid = false,
  ...inputProps
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hintId = `${inputId}-hint`;
  const isInvalid = ariaInvalid !== false && ariaInvalid !== "false";

  return (
    <Field>
      <FieldLabel className="ml-1 gap-0" htmlFor={inputId}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-green-500">
            *
          </span>
        )}
      </FieldLabel>
      <Input
        id={inputId}
        type="text"
        required={required}
        className={cn("mt-1 mb-1.5 h-10 md:h-12", className)}
        aria-invalid={ariaInvalid}
        aria-describedby={hint ? hintId : undefined}
        {...inputProps}
      />
      {hint &&
        (isInvalid ? (
          <FieldError id={hintId} className="ml-1">
            {hint.errorMessage ?? hint.description}
          </FieldError>
        ) : (
          <FieldDescription id={hintId} className="ml-1">
            {hint.description}
          </FieldDescription>
        ))}
    </Field>
  );
}
