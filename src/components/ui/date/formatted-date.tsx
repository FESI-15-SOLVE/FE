'use client';

import dynamic from 'next/dynamic';
import {
  formatMeetingDate,
  formatMeetingTime,
} from '@/features/meeting/utils/date-formatter';

export interface FormattedDateProps {
  /** ISO 8601 날짜 문자열 */
  value?: string | null;
  /** 표시 모드: 'date' (날짜), 'time' (시간), 'datetime' (날짜 + 시간) */
  mode?: 'date' | 'time' | 'datetime';
  className?: string;
}

function FormattedDateInner({
  value,
  mode = 'date',
  className,
}: FormattedDateProps) {
  if (!value) return null;

  let text = '';
  if (mode === 'time') {
    text = formatMeetingTime(value);
  } else if (mode === 'datetime') {
    text = `${formatMeetingDate(value)} ${formatMeetingTime(value)}`;
  } else {
    text = formatMeetingDate(value);
  }

  return <span className={className}>{text}</span>;
}

/**
 * FormattedDate Component
 * 
 * Vercel Node.js 서버(UTC 시간대)와 유저 브라우저(KST 시간대) 간의 시간대 불일치로 인해
 * 발생하던 React Hydration Mismatch 오류를 구조적으로 원천 차단하는 날짜/시간 포맷팅 컴포넌트입니다.
 * 
 * `next/dynamic`의 `{ ssr: false }` 옵션을 적용하여 서버 SSR 렌더링 대상에서 완전히 배제하고,
 * 오직 클라이언트 브라우저 마운트 시점에만 렌더링되도록 동작합니다.
 * 
 * @example
 * ```tsx
 * // 1. 날짜 포맷팅 (예: 2026년 08월 03일 (월))
 * <FormattedDate value={meeting.dateTime} mode="date" />
 * 
 * // 2. 시간 포맷팅 (예: 17:30)
 * <FormattedDate value={meeting.dateTime} mode="time" />
 * 
 * // 3. 날짜 + 시간 통합 포맷팅
 * <FormattedDate value={meeting.dateTime} mode="datetime" />
 * ```
 */
export const FormattedDate = dynamic<FormattedDateProps>(
  () => Promise.resolve(FormattedDateInner),
  {
    ssr: false,
    loading: () => (
      <span className="inline-block w-12 h-4 bg-slate-100 animate-pulse rounded" />
    ),
  },
);
