import {
  addFavoriteAction,
  removeFavoriteAction,
} from '@/actions/meeting/favorite-actions';

export async function addFavoriteApi(meetingId: string | number): Promise<void> {
  const result = await addFavoriteAction(Number(meetingId));
  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function removeFavoriteApi(meetingId: string | number): Promise<void> {
  const result = await removeFavoriteAction(Number(meetingId));
  if (!result.success) {
    throw new Error(result.message);
  }
}

