import { describe, it, expect } from 'vitest';
import { formatMeetingDateTime, formatRelativeTime } from '../date';

describe('formatMeetingDateTime', () => {
  it('null/undefined/빈문자열 입력 시 빈 텍스트 객체를 반환해야 한다', () => {
    expect(formatMeetingDateTime(null)).toEqual({ dateText: '', timeText: '' });
    expect(formatMeetingDateTime(undefined)).toEqual({ dateText: '', timeText: '' });
    expect(formatMeetingDateTime('')).toEqual({ dateText: '', timeText: '' });
  });

  it('유효하지 않은 날짜 문자열 입력 시 빈 텍스트 객체를 반환해야 한다', () => {
    expect(formatMeetingDateTime('invalid-date')).toEqual({ dateText: '', timeText: '' });
  });

  it('올바른 ISO 날짜 문자열을 한국 타임존(Asia/Seoul) 기준 M월 d일 및 HH:mm 형식으로 변환해야 한다', () => {
    const result = formatMeetingDateTime('2026-08-17T14:30:00Z');
    expect(result.dateText).toBe('8월 17일');
    expect(result.timeText).toBe('23:30');
  });
});

describe('formatRelativeTime', () => {
  it('null/undefined/빈문자열 입력 시 빈 문자열을 반환해야 한다', () => {
    expect(formatRelativeTime(null)).toBe('');
    expect(formatRelativeTime(undefined)).toBe('');
    expect(formatRelativeTime('')).toBe('');
  });

  it('유효하지 않은 날짜 문자열 입력 시 빈 문자열을 반환해야 한다', () => {
    expect(formatRelativeTime('invalid-date')).toBe('');
  });

  it('유효한 날짜 입력 시 상대 시간 문자열을 반환해야 한다', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 5).toISOString();
    const result = formatRelativeTime(pastDate);
    expect(result).toContain('분 전');
  });
});
