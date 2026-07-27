import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full p-3",
        "rounded-12 aria-invalid:border-error-500 data-invalid:border-error-500 border border-transparent focus-visible:border-green-500",
        "bg-slate-50 transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "text-sm font-normal text-slate-800 placeholder:text-slate-500 md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
