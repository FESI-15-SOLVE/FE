import { formatInTimeZone } from 'date-fns-tz';
import { defaultTimeZone } from '@/lib/date-locale';

/**
 * 모임 일시 ISO 문자열을 기본 타임존 기준 'M월 D일', 'HH:mm' 형태의 날짜 및 시간 텍스트로 변환합니다.
 */
export function formatMeetingDateTime(dateTime?: string | null): {
  dateText: string;
  timeText: string;
} {
  if (!dateTime) return { dateText: '', timeText: '' };

  const d = new Date(dateTime);
  if (isNaN(d.getTime())) return { dateText: '', timeText: '' };

  return {
    dateText: formatInTimeZone(d, defaultTimeZone, 'M월 d일'),
    timeText: formatInTimeZone(d, defaultTimeZone, 'HH:mm'),
  };
}

/**
 * 마감 일시 ISO 문자열을 받아 기본 타임존 기준 '오늘 H시 마감' 또는 '마감 임박' 텍스트로 변환합니다.
 */
export function formatDeadlineText(registrationEnd?: string | null): string {
  if (!registrationEnd) return '마감 임박';

  const regEnd = new Date(registrationEnd);
  if (isNaN(regEnd.getTime())) return '마감 임박';

  return `오늘 ${formatInTimeZone(regEnd, defaultTimeZone, 'H')}시 마감`;
}




