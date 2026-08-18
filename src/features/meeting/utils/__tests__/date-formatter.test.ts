import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatMeetingDate,
  formatMeetingTime,
  formatDeadlineTag,
} from '../date-formatter';

describe('date-formatter 유틸리티', () => {
  describe('formatMeetingDate', () => {
    it('입력값이 null, undefined, 빈 문자열인 경우 "날짜 미정"을 반환한다', () => {
      expect(formatMeetingDate(null)).toBe('날짜 미정');
      expect(formatMeetingDate(undefined)).toBe('날짜 미정');
      expect(formatMeetingDate('')).toBe('날짜 미정');
    });

    it('유효하지 않은 날짜 문자열 입력 시 "날짜 미정"을 반환한다', () => {
      expect(formatMeetingDate('invalid-date')).toBe('날짜 미정');
    });

    it('올바른 ISO 날짜 문자열 입력 시 KST 기준 날짜 형식으로 포맷팅한다', () => {
      const result = formatMeetingDate('2026-08-04T15:30:00.000Z');
      expect(result).toMatch(/2026년 08월 0[45]일/);
    });
  });

  describe('formatMeetingTime', () => {
    it('입력값이 유효하지 않은 경우 "시간 미정"을 반환한다', () => {
      expect(formatMeetingTime(null)).toBe('시간 미정');
      expect(formatMeetingTime('abc')).toBe('시간 미정');
    });

    it('올바른 날짜 문자열 입력 시 HH:mm 시분 형식으로 포맷팅한다', () => {
      const result = formatMeetingTime('2026-08-04T15:30:00.000Z');
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('formatDeadlineTag', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-18T10:00:00+09:00'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('마감일 입력값이 없거나 유효하지 않은 경우 undefined를 반환한다', () => {
      expect(formatDeadlineTag(null)).toBeUndefined();
      expect(formatDeadlineTag('invalid')).toBeUndefined();
    });

    it('마감일이 현재 시각보다 과거인 경우 "모집 마감"을 반환한다', () => {
      expect(formatDeadlineTag('2026-08-17T10:00:00+09:00')).toBe('모집 마감');
    });

    it('마감일이 오늘 날짜인 경우 "오늘 마감"을 반환한다', () => {
      expect(formatDeadlineTag('2026-08-18T23:59:59+09:00')).toBe('오늘 마감');
    });

    it('마감일이 1일 이하로 남은 경우 "마감 임박" 태그를 반환한다', () => {
      expect(formatDeadlineTag('2026-08-19T10:00:00+09:00')).toBe('마감 임박');
    });

    it('마감일이 2일 이상 남은 경우 D-X 태그를 반환한다', () => {
      expect(formatDeadlineTag('2026-08-21T10:00:00+09:00')).toBe('D-3');
    });
  });
});
