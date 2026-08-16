import { describe, it, expect } from 'vitest';
import { mapFiltersToQueryParams } from '../filter-mapper';

describe('mapFiltersToQueryParams', () => {
  it('모임 필터를 서버 쿼리 파라미터 규격으로 변환해야 한다', () => {
    const res = mapFiltersToQueryParams({
      type: 'OFFICE_STRETCHING',
      region: '서울',
      sortBy: 'dateTime',
      sortOrder: 'asc',
    });

    expect(res.type).toBe('OFFICE_STRETCHING');
    expect(res.region).toBe('서울');
    expect(res.sortBy).toBe('dateTime');
    expect(res.sortOrder).toBe('asc');
    expect(res.size).toBe(10);
  });

  it('지역이 "지역 전체"이거나 빈값이면 region을 undefined로 처리해야 한다', () => {
    const res1 = mapFiltersToQueryParams({ region: '지역 전체' });
    expect(res1.region).toBeUndefined();

    const res2 = mapFiltersToQueryParams({ region: '서울' });
    expect(res2.region).toBe('서울');
  });

  it('특정 날짜가 지정되면 해당 날짜의 00:00:00부터 23:59:59까지의 KST 범위 ISO 값을 생성해야 한다', () => {
    const res = mapFiltersToQueryParams({ date: '2026-08-20' });
    expect(res.dateStart).toBeDefined();
    expect(res.dateEnd).toBeDefined();
    expect(res.dateStart).toContain('2026-08-19T15:00:00'); // KST 00:00 = UTC 15:00 previous day
  });
});
