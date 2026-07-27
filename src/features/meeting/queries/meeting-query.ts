import {
  infiniteQueryOptions,
  queryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { MeetingFilters } from '../utils/filter-mapper';
import { MeetingList, MeetingWithHost, ParticipantList } from '@/api/data-contracts';
import { fetchMeetings } from '../api/fetch-meetings';
import { fetchMeetingDetail } from '../api/fetch-meeting-detail';
import { fetchParticipants } from '../api/fetch-participants';

type MeetingQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<MeetingList>;

type MeetingDetailQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<MeetingWithHost>;

type MeetingParticipantsQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<ParticipantList>;

export const meetingQueries = {
  all: () => ['meetings'] as const,

  // 1. 키(Key)만 관리하는 영역
  listKeys: () => [...meetingQueries.all(), 'list'] as const,
  listKey: (teamId: string, filters: MeetingFilters) =>
    [...meetingQueries.listKeys(), teamId, filters] as const,

  detailKeys: () => [...meetingQueries.all(), 'detail'] as const,
  detailKey: (id: string) => [...meetingQueries.detailKeys(), id] as const,

  participantKeys: () => [...meetingQueries.all(), 'participants'] as const,
  participantKey: (id: string) => [...meetingQueries.participantKeys(), id] as const,

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

  participantsQuery: (id: string, customQueryFn?: MeetingParticipantsQueryFn) =>
    queryOptions({
      queryKey: meetingQueries.participantKey(id),
      queryFn: customQueryFn ?? (async () => fetchParticipants(id)),
      enabled: Boolean(id),
    }),
};
