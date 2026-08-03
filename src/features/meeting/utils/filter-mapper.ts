import { format } from 'date-fns';
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
 * 날짜를 자정(00:00:00.000) 기준으로 정규화하여
 * SSR과 CSR 시점 간 밀리초 차이로 인한 QueryKey 불일치를 방지합니다.
 */
function getNormalizedDateStart(dateStr?: string): string {
  if (dateStr) {
    return `${dateStr}T00:00:00.000Z`;
  }
  const today = format(new Date(), 'yyyy-MM-dd');
  return `${today}T00:00:00.000Z`;
}

export function mapFiltersToQueryParams(
  filters: MeetingFilters,
  options?: MapFiltersOptions,
) {
  const isAllRegion = !filters.region || filters.region === '지역 전체';
  const defaultDateStart = options?.defaultToCurrentDate
    ? getNormalizedDateStart()
    : undefined;

  let computedDateStart: string | undefined = defaultDateStart;
  if (filters.date) {
    computedDateStart = getNormalizedDateStart(filters.date);
  }

  return {
    type: filters.type || undefined,
    region: isAllRegion ? undefined : (filters.region || undefined),
    dateStart: computedDateStart,
    dateEnd: filters.date ? `${filters.date}T23:59:59.999Z` : undefined,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    size: 10,
  };
}
