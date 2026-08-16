import { describe, it, expect } from 'vitest';
import { mapReviewFiltersToQueryParams } from '../review-filter-mapper';

describe('mapReviewFiltersToQueryParams', () => {
  it('리뷰 필터를 서버 쿼리 파라미터 규격으로 변환해야 한다', () => {
    const res = mapReviewFiltersToQueryParams({
      type: 'DALLAEM',
      region: '인천',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    expect(res.type).toBe('DALLAEM');
    expect(res.region).toBe('인천');
    expect(res.sortBy).toBe('createdAt');
    expect(res.sortOrder).toBe('desc');
    expect(res.size).toBe(10);
  });

  it('지역이 "지역 전체"이면 region을 undefined로 변환해야 한다', () => {
    const res = mapReviewFiltersToQueryParams({ region: '지역 전체' });
    expect(res.region).toBeUndefined();
  });
});
