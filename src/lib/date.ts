import { formatInTimeZone } from 'date-fns-tz';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
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
 * ISO 날짜 문자열을 '방금 전', 'N시간 전', 'N일 전' 형태의 상대 시간으로 변환합니다.
 */
export function formatRelativeTime(dateTime?: string | null): string {
  if (!dateTime) return '';
  const d = new Date(dateTime);
  if (isNaN(d.getTime())) return '';
  return formatDistanceToNow(d, { addSuffix: true, locale: ko });
}
