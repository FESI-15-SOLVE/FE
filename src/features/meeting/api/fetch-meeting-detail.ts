import { clientApi } from '@/lib/client-api';
import { MeetingWithHost } from '@/api/data-contracts';

export async function fetchMeetingDetail(id: string): Promise<MeetingWithHost> {
  const res = await clientApi.get<MeetingWithHost>(`/meetings/${id}`);
  return res.data;
}
