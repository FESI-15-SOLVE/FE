import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "rounded-12 w-full min-w-0 border border-transparent bg-slate-50 px-3 text-sm font-normal text-slate-800 transition-colors outline-none placeholder:text-slate-500 md:px-3 md:text-base",
        "aria-invalid:border-error-500 data-invalid:border-error-500 disabled:bg-input/50 focus-visible:border-green-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-foreground file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
