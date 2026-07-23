/**
 * 모임 일시 ISO 문자열을 'M월 D일', 'HH:mm' 형태의 날짜 및 시간 텍스트로 변환합니다.
 */
export function formatMeetingDateTime(dateTime?: string | null): {
  dateText: string;
  timeText: string;
} {
  if (!dateTime) {
    return { dateText: "", timeText: "" };
  }

  const d = new Date(dateTime);
  if (isNaN(d.getTime())) {
    return { dateText: "", timeText: "" };
  }

  const dateText = `${d.getMonth() + 1}월 ${d.getDate()}일`;
  const timeText = d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { dateText, timeText };
}

/**
 * 마감 일시 ISO 문자열을 받아 '오늘 H시 마감' 또는 '마감 임박' 텍스트로 변환합니다.
 */
export function formatDeadlineText(registrationEnd?: string | null): string {
  if (!registrationEnd) {
    return "마감 임박";
  }

  const regEnd = new Date(registrationEnd);
  if (isNaN(regEnd.getTime())) {
    return "마감 임박";
  }

  return `오늘 ${regEnd.getHours()}시 마감`;
}
