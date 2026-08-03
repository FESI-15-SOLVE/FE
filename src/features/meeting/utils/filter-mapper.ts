import { SortBy, SortOrder } from '@/features/meeting/schema/meeting-query-schema';

export interface MeetingFilters {
  type?: string | null;
  region?: string | null;
  date?: string | null;
  sortBy?: SortBy | null;
  sortOrder?: SortOrder | null;
}

export interface MapFiltersOptions {
  defaultToCurrentDate?: boolean;
}

/**
 * 한국 시각(KST, UTC+9) 기준 날짜를 UTC ISO 8601 문자열 범위로 변환합니다.
 */
function getKSTDateRange(dateStr: string) {
  const dateStart = new Date(`${dateStr}T00:00:00+09:00`).toISOString();
  const dateEnd = new Date(`${dateStr}T23:59:59.999+09:00`).toISOString();
  return { dateStart, dateEnd };
}

/**
 * 한국 시각(KST, UTC+9) 기준 오늘 날짜를 'yyyy-MM-dd' 형식으로 반환합니다.
 * 서버(UTC)와 브라우저(로컬 타임존)가 달라도 항상 동일한 결과를 보장합니다.
 */
function getTodayKST(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
  }).format(new Date()); // 'yyyy-MM-dd'
}

export function mapFiltersToQueryParams(
  filters: MeetingFilters,
  options?: MapFiltersOptions,
) {
  const isAllRegion = !filters.region || filters.region === '지역 전체';
  const todayKST = getTodayKST();
  const targetDateStr =
    filters.date || (options?.defaultToCurrentDate ? todayKST : undefined);

  let computedDateStart: string | undefined = undefined;
  let computedDateEnd: string | undefined = undefined;

  if (targetDateStr) {
    const range = getKSTDateRange(targetDateStr);
    computedDateStart = range.dateStart;
    computedDateEnd = range.dateEnd;
  }

  return {
    type: filters.type || undefined,
    region: isAllRegion ? undefined : (filters.region || undefined),
    dateStart: computedDateStart,
    dateEnd: computedDateEnd,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    size: 10,
  };
}
