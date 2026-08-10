import {
  infiniteQueryOptions,
  queryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { MeetingFilters } from '../utils/filter-mapper';
import {
  MeetingList,
  MeetingWithHost,
  ParticipantList,
  GetJoinedMeetingsParams,
  JoinedMeetingList,
} from '@/api/data-contracts';
import { fetchMeetings } from '../api/fetch-meetings';
import { fetchMeetingDetail } from '../api/fetch-meeting-detail';
import { fetchParticipants } from '../api/fetch-participants';
import { fetchJoinedMeetings } from '../api/fetch-joined-meetings';

/** 작성 가능한 리뷰 모임 목록 쿼리 파라미터 상수 (서버 프리페치/클라이언트 양쪽에서 공유) */
export const JOINED_WRITABLE_PARAMS = {
  completed: 'true',
  reviewed: 'false',
} as const satisfies Partial<GetJoinedMeetingsParams>;

type MeetingQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<MeetingList>;

type MeetingDetailQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<MeetingWithHost>;

type MeetingParticipantsQueryFn = (
  context: QueryFunctionContext<readonly unknown[]>,
) => Promise<ParticipantList>;

type JoinedMeetingQueryFn = (
  context: QueryFunctionContext<readonly unknown[], string | undefined>,
) => Promise<JoinedMeetingList>;

export const meetingQueries = {
  all: () => ['meetings'] as const,

  // 1. 키(Key)만 관리하는 영역
  listKeys: () => [...meetingQueries.all(), 'list'] as const,
  listKey: (teamId: string, filters: MeetingFilters) =>
    [...meetingQueries.listKeys(), teamId, filters] as const,

  joinedListKeys: () => [...meetingQueries.listKeys(), 'joined'] as const,
  joinedListKey: (params?: Partial<GetJoinedMeetingsParams>) =>
    [...meetingQueries.joinedListKeys(), params ?? {}] as const,

  detailKeys: () => [...meetingQueries.all(), 'detail'] as const,
  detailKey: (id: number) => [...meetingQueries.detailKeys(), String(id)] as const,

  participantKeys: () => [...meetingQueries.all(), 'participants'] as const,
  participantKey: (id: number) => [...meetingQueries.participantKeys(), String(id)] as const,

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

  joinedListQuery: (
    params?: Partial<GetJoinedMeetingsParams>,
    customQueryFn?: JoinedMeetingQueryFn,
  ) =>
    infiniteQueryOptions({
      queryKey: meetingQueries.joinedListKey(params),
      queryFn:
        customQueryFn ??
        (async ({ pageParam }) =>
          fetchJoinedMeetings(params, pageParam ? String(pageParam) : undefined)),
      getNextPageParam: (lastPage: JoinedMeetingList) =>
        lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),

  detailQuery: (id: number, customQueryFn?: MeetingDetailQueryFn) =>
    queryOptions({
      queryKey: meetingQueries.detailKey(id),
      queryFn: customQueryFn ?? (async () => fetchMeetingDetail(id)),
      enabled: Boolean(id),
    }),

  participantsQuery: (id: number, customQueryFn?: MeetingParticipantsQueryFn) =>
    queryOptions({
      queryKey: meetingQueries.participantKey(id),
      queryFn: customQueryFn ?? (async () => fetchParticipants(id)),
      enabled: Boolean(id),
    }),
};

