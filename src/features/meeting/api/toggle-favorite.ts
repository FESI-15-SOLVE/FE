import {
  addFavoriteAction,
  removeFavoriteAction,
} from '@/actions/meeting/favorite-actions';
import { unwrapAction } from '@/lib/safe-action';

export async function addFavoriteApi(meetingId: string | number): Promise<void> {
  unwrapAction(await addFavoriteAction({ meetingId: Number(meetingId) }));
}

export async function removeFavoriteApi(meetingId: string | number): Promise<void> {
  unwrapAction(await removeFavoriteAction({ meetingId: Number(meetingId) }));
}
