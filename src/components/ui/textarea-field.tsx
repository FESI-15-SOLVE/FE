import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface TextareaFieldProps extends Omit<
  React.ComponentProps<typeof Textarea>,
  "aria-describedby"
> {
  label: string;
  hint?: {
    description: React.ReactNode;
    errorMessage?: React.ReactNode;
  };
}

export function TextareaField({
  id,
  label,
  hint,
  required = false,
  className,
  "aria-invalid": ariaInvalid = false,
  ...textareaProps
}: TextareaFieldProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const hintId = `${textareaId}-hint`;
  const isInvalid = ariaInvalid !== false && ariaInvalid !== "false";

  return (
    <Field>
      <FieldLabel className="ml-1 gap-0" htmlFor={textareaId}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-green-500">
            *
          </span>
        )}
      </FieldLabel>
      <Textarea
        id={textareaId}
        required={required}
        className={cn("mt-1 mb-1.5", className)}
        aria-invalid={ariaInvalid}
        aria-describedby={hint ? hintId : undefined}
        {...textareaProps}
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
