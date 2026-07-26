import { clientApi } from '@/lib/client-api';
import { MeetingList } from '@/api/data-contracts';
import { MeetingFilters, mapFiltersToQueryParams } from '../utils/filter-mapper';

export async function fetchMeetings(
  filters: MeetingFilters,
  pageParam?: string
): Promise<MeetingList> {
  const queryParams = mapFiltersToQueryParams(filters);
  const res = await clientApi.get<MeetingList>('/meetings', {
    params: {
      ...queryParams,
      cursor: pageParam,
    },
  });
  return res.data;
}
