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
            "bg-black/80 text-white font-semibold px-8 py-4 rounded-xl text-base tracking-tight",
        },
      }}
    />
  );
}
