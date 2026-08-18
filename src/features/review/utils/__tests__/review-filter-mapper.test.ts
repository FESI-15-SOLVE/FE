import { describe, it, expect } from 'vitest';
import { mapReviewFiltersToQueryParams } from '../review-filter-mapper';

describe('mapReviewFiltersToQueryParams 유틸리티', () => {
  it('빈 필터 전달 시 기본 쿼리 파라미터(size: 10)를 반환한다', () => {
    const result = mapReviewFiltersToQueryParams({});
    expect(result).toEqual({
      type: undefined,
      region: undefined,
      dateStart: undefined,
      dateEnd: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      size: 10,
    });
  });

  it('"지역 전체" 선택 시 region을 undefined로 변환한다', () => {
    const result = mapReviewFiltersToQueryParams({ region: '지역 전체' });
    expect(result.region).toBeUndefined();
  });

  it('날짜 선택 시 KST 하루 범위(00:00:00 ~ 23:59:59) ISO 문자열을 생성한다', () => {
    const result = mapReviewFiltersToQueryParams({ date: '2026-08-18' });
    expect(result.dateStart).toBe('2026-08-17T15:00:00.000Z');
    expect(result.dateEnd).toBe('2026-08-18T14:59:59.999Z');
  });
});
