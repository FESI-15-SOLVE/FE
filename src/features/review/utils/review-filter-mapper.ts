import { ReviewSortBy, SortOrder } from '../schema/review-query-schema';

export interface ReviewFilters {
  type?: string | null;
  region?: string | null;
  date?: string | null;
  sortBy?: ReviewSortBy | null;
  sortOrder?: SortOrder | null;
}

function getKSTDateRange(dateStr: string) {
  const dateStart = new Date(`${dateStr}T00:00:00+09:00`).toISOString();
  const dateEnd = new Date(`${dateStr}T23:59:59.999+09:00`).toISOString();
  return { dateStart, dateEnd };
}

export function mapReviewFiltersToQueryParams(filters: ReviewFilters) {
  const isAllRegion = !filters.region || filters.region === '지역 전체';

  let computedDateStart: string | undefined = undefined;
  let computedDateEnd: string | undefined = undefined;

  if (filters.date) {
    const range = getKSTDateRange(filters.date);
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
