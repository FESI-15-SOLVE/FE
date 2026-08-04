import {
  addFavoriteAction,
  removeFavoriteAction,
} from '@/actions/meeting/favorite-actions';
import { unwrapAction } from '@/lib/safe-action';

export async function addFavoriteApi(meetingId: number): Promise<void> {
  unwrapAction(await addFavoriteAction({ meetingId }));
}

export async function removeFavoriteApi(meetingId: number): Promise<void> {
  unwrapAction(await removeFavoriteAction({ meetingId }));
}
