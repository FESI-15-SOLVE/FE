import { describe, expect, it } from "vitest";

import { formatRelativeTime } from "./format-relative-time";

describe("formatRelativeTime", () => {
  const now = new Date("2026-07-21T15:00:00.000Z");

  it("유효하지 않은 날짜면 빈 문자열을 반환한다", () => {
    expect(formatRelativeTime(null, now)).toBe("");
    expect(formatRelativeTime("invalid-date", now)).toBe("");
  });

  it("1분 미만이면 방금 전을 반환한다", () => {
    expect(formatRelativeTime("2026-07-21T14:59:30.000Z", now)).toBe(
      "방금 전",
    );
  });

  it("분·시간·일 단위로 상대 시간을 반환한다", () => {
    expect(formatRelativeTime("2026-07-21T14:59:00.000Z", now)).toBe("1분 전");
    expect(formatRelativeTime("2026-07-21T13:00:00.000Z", now)).toBe(
      "2시간 전",
    );
    expect(formatRelativeTime("2026-07-17T15:00:00.000Z", now)).toBe("4일 전");
  });
});
