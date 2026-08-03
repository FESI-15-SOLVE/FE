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

export function mapFiltersToQueryParams(
  filters: MeetingFilters,
  options?: MapFiltersOptions,
) {
  const isAllRegion = !filters.region || filters.region === '지역 전체';
  const defaultDateStart = options?.defaultToCurrentDate
    ? new Date().toISOString()
    : undefined;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const isSelectedDateToday = filters.date === todayStr;

  let computedDateStart: string | undefined = defaultDateStart;
  if (filters.date) {
    computedDateStart = isSelectedDateToday
      ? new Date().toISOString()
      : `${filters.date}T00:00:00Z`;
  }

  return {
    type: filters.type || undefined,
    region: isAllRegion ? undefined : (filters.region || undefined),
    dateStart: computedDateStart,
    dateEnd: filters.date ? `${filters.date}T23:59:59Z` : undefined,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    size: 10,
  };
}
