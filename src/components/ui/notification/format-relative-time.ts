const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export function formatRelativeTime(
  createdAt: string | null | undefined,
  now: Date = new Date(),
): string {
  if (!createdAt) {
    return "";
  }

  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return "";
  }

  const diffInMs = Math.max(0, now.getTime() - createdDate.getTime());

  if (diffInMs < MINUTE_IN_MS) {
    return "방금 전";
  }

  if (diffInMs < HOUR_IN_MS) {
    return `${Math.floor(diffInMs / MINUTE_IN_MS)}분 전`;
  }

  if (diffInMs < DAY_IN_MS) {
    return `${Math.floor(diffInMs / HOUR_IN_MS)}시간 전`;
  }

  return `${Math.floor(diffInMs / DAY_IN_MS)}일 전`;
}
