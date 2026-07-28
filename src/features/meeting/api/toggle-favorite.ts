import {
  addFavoriteAction,
  removeFavoriteAction,
} from '@/actions/meeting/favorite-actions';

export async function addFavoriteApi(meetingId: string | number): Promise<void> {
  const result = await addFavoriteAction({ meetingId: Number(meetingId) });
  if (result?.serverError) {
    throw new Error(result.serverError.message);
  }
}

export async function removeFavoriteApi(meetingId: string | number): Promise<void> {
  const result = await removeFavoriteAction({ meetingId: Number(meetingId) });
  if (result?.serverError) {
    throw new Error(result.serverError.message);
  }
}
