import { clientApi } from '@/lib/client-api';

export async function addFavoriteApi(meetingId: string | number): Promise<void> {
  await clientApi.post(`/meetings/${meetingId}/favorites`);
}

export async function removeFavoriteApi(meetingId: string | number): Promise<void> {
  await clientApi.delete(`/meetings/${meetingId}/favorites`);
}
