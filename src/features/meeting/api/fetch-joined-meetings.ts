import { clientApi } from '@/lib/client-api';
import { JoinedMeetingList, GetJoinedMeetingsParams } from '@/api/data-contracts';

export async function fetchJoinedMeetings(
  params?: Partial<GetJoinedMeetingsParams>,
  pageParam?: string,
): Promise<JoinedMeetingList> {
  const res = await clientApi.get<JoinedMeetingList>('/meetings/joined', {
    params: {
      ...params,
      cursor: pageParam,
    },
  });
  return res.data;
}
