import { format, differenceInDays, isBefore, isToday } from 'date-fns';
import { defaultLocale } from '@/lib/date-locale';

/**
 * 모임 일시(dateTime) ➡️ "2026년 02월 01일 (일)" 포맷 반환
 */
export function formatMeetingDate(dateTime?: string | null): string {
  if (!dateTime) return '날짜 미정';
  try {
    return format(new Date(dateTime), 'yyyy년 MM월 dd일 (EEE)', { locale: defaultLocale });
  } catch {
    return '날짜 미정';
  }
}

/**
 * 모임 일시(dateTime) ➡️ "14:00" 포맷 반환
 */
export function formatMeetingTime(dateTime?: string | null): string {
  if (!dateTime) return '시간 미정';
  try {
    return format(new Date(dateTime), 'HH:mm');
  } catch {
    return '시간 미정';
  }
}

/**
 * 모집 마감 일시(registrationEnd) ➡️ "오늘 마감", "마감 임박 (D-1)", "D-3", "모집 마감" 태그 텍스트 계산
 */
export function formatDeadlineTag(registrationEnd?: string | null): string | undefined {
  if (!registrationEnd) return undefined;
  try {
    const end = new Date(registrationEnd);
    const now = new Date();

    if (isBefore(end, now)) {
      return '모집 마감';
    }

    if (isToday(end)) {
      return '오늘 마감';
    }

    const diffDays = differenceInDays(end, now);
    if (diffDays === 0 || diffDays === 1) {
      return '마감 임박';
    }

    return `D-${diffDays}`;
  } catch {
    return undefined;
  }
}
