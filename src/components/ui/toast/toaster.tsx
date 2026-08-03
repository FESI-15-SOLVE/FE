"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2.5 bg-black/80 text-white font-semibold px-6 py-3.5 rounded-xl text-base tracking-tight whitespace-nowrap",
          icon: "shrink-0",
        },
      }}
    />
  );
}
