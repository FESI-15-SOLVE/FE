import { clientApi } from '@/lib/client-api';
import { MeetingList, GetMyCreatedMeetingsParams } from '@/api/data-contracts';

export async function fetchCreatedMeetings(
  params?: Partial<GetMyCreatedMeetingsParams>,
  cursor?: string,
  size: number = 10,
): Promise<MeetingList> {
  const res = await clientApi.get<MeetingList>('/meetings/my', {
    params: {
      ...params,
      cursor,
      size,
    },
  });
  return res.data;
}
