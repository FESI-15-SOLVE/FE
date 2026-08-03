import { formatInTimeZone } from 'date-fns-tz';
import { defaultLocale, defaultTimeZone } from '@/lib/date-locale';

/**
 * 모임 일시 ➡️ "2026년 08월 04일 (화)"
 */
export function formatMeetingDate(dateTime?: string | null): string {
  if (!dateTime) return '날짜 미정';
  try {
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) return '날짜 미정';
    return formatInTimeZone(d, defaultTimeZone, 'yyyy년 MM월 dd일 (EEE)', {
      locale: defaultLocale,
    });
  } catch {
    return '날짜 미정';
  }
}

/**
 * 모임 일시 ➡️ "15:30"
 */
export function formatMeetingTime(dateTime?: string | null): string {
  if (!dateTime) return '시간 미정';
  try {
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) return '시간 미정';
    return formatInTimeZone(d, defaultTimeZone, 'HH:mm');
  } catch {
    return '시간 미정';
  }
}

/**
 * 모집 마감 태그 ➡️ "오늘 마감", "마감 임박", "D-1"
 */
export function formatDeadlineTag(
  registrationEnd?: string | null,
): string | undefined {
  if (!registrationEnd) return undefined;
  try {
    const end = new Date(registrationEnd);
    if (isNaN(end.getTime())) return undefined;

    const now = new Date();
    if (end < now) return '모집 마감';

    const endDateStr = formatInTimeZone(end, defaultTimeZone, 'yyyy-MM-dd');
    const nowDateStr = formatInTimeZone(now, defaultTimeZone, 'yyyy-MM-dd');

    if (endDateStr === nowDateStr) {
      return '오늘 마감';
    }

    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return '마감 임박';
    }

    return `D-${diffDays}`;
  } catch {
    return undefined;
  }
}
