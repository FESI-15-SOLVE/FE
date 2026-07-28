"use client";

import { useEffect, useState } from "react";

import { formatRelativeTime } from "../format-relative-time";

export function useFormattedRelativeTime(
  createdAt: string | null | undefined,
  relativeTime?: string,
): string {
  const [clientFormattedTime, setClientFormattedTime] = useState("");

  useEffect(() => {
    if (relativeTime) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration 후 상대 시간 표시
    setClientFormattedTime(formatRelativeTime(createdAt));
  }, [relativeTime, createdAt]);

  return relativeTime ?? clientFormattedTime;
}
