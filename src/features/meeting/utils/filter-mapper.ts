import { SortBy, SortOrder } from '@/features/meeting/schema/meeting-query-schema';

export interface MeetingFilters {
  type?: string | null;
  region?: string | null;
  date?: string | null;
  sortBy?: SortBy | null;
  sortOrder?: SortOrder | null;
}

export function mapFiltersToQueryParams(filters: MeetingFilters) {
  const isAllRegion = !filters.region || filters.region === '지역 전체';

  return {
    type: filters.type || undefined,
    region: isAllRegion ? undefined : (filters.region || undefined),
    dateStart: filters.date ? `${filters.date}T00:00:00Z` : undefined,
    dateEnd: filters.date ? `${filters.date}T23:59:59Z` : undefined,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    size: 10,
  };
}
