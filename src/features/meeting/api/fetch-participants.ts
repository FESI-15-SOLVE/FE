import { clientApi } from '@/lib/client-api';
import { ParticipantList } from '@/api/data-contracts';

export async function fetchParticipants(
  meetingId: string | number,
): Promise<ParticipantList> {
  const res = await clientApi.get<ParticipantList>(
    `/meetings/${meetingId}/participants`,
  );
  return res.data;
}
