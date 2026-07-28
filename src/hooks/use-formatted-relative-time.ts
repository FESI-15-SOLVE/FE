"use client";

import { useEffect, useState } from "react";

import { formatRelativeTime } from "@/lib/date/format-relative-time";

/**
 * SSR hydration mismatch를 피하기 위한 상대 시간 훅.
 * - relativeTime이 있으면 그대로 사용
 * - 없으면 클라이언트 마운트 후에만 formatRelativeTime 결과를 표시
 *
 * 알림, 댓글, 피드 등 "n분 전" UI 어디서든 재사용할 수 있습니다.
 */
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
