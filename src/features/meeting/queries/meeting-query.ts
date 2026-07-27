import {
  infiniteQueryOptions,
  queryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { MeetingFilters } from '../utils/filter-mapper';
import { MeetingList, MeetingWithHost } from '@/api/data-contracts';
import { fetchMeetings } from '../api/fetch-meetings';
import { fetchMeetingDetail } from '../api/fetch-meeting-detail';

/**
 * 쿼리 함수(queryFn) 오버라이딩을 위한 타입 정의입니다.
 * 기본적으로 클라이언트 API(fetchMeetings)가 사용되지만,
 * 서버 컴포넌트(page.tsx) 등에서 백엔드 API(ServerApi)를 직접 호출하도록
 * 환경에 맞는 페칭 로직을 주입(Dependency Injection)할 때 사용됩니다.
 */
type MeetingQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<MeetingList>;

type MeetingDetailQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<MeetingWithHost>;

export const meetingQueries = {
  all: () => ['meetings'] as const,

  // 1. 키(Key)만 관리하는 영역
  listKeys: () => [...meetingQueries.all(), 'list'] as const,
  listKey: (teamId: string, filters: MeetingFilters) =>
    [...meetingQueries.listKeys(), teamId, filters] as const,

  detailKeys: () => [...meetingQueries.all(), 'detail'] as const,
  detailKey: (id: string) => [...meetingQueries.detailKeys(), id] as const,

  // 2. 쿼리 전체 옵션(Options)을 관리하는 영역
  listQuery: (
    teamId: string,
    filters: MeetingFilters,
    customQueryFn?: MeetingQueryFn,
  ) =>
    infiniteQueryOptions({
      queryKey: meetingQueries.listKey(teamId, filters),
      queryFn:
        customQueryFn ??
        (async ({ pageParam }) => fetchMeetings(filters, pageParam)),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage: MeetingList) =>
        lastPage?.nextCursor ?? undefined,
    }),

  detailQuery: (id: string, customQueryFn?: MeetingDetailQueryFn) =>
    queryOptions({
      queryKey: meetingQueries.detailKey(id),
      queryFn: customQueryFn ?? (async () => fetchMeetingDetail(id)),
      enabled: Boolean(id),
    }),
};
