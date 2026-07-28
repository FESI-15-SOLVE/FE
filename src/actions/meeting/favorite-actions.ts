'use server';

import { z } from 'zod';
import { ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { actionClient } from '@/lib/safe-action';

export const addFavoriteAction = actionClient
  .inputSchema(z.custom<{ meetingId: number }>())
  .action(async ({ parsedInput: { meetingId } }) => {
    const response = await ServerApi.favorites.addFavorite({
      teamId: TEAM_ID,
      meetingId,
    });
    return response.data;
  });

export const removeFavoriteAction = actionClient
  .inputSchema(z.custom<{ meetingId: number }>())
  .action(async ({ parsedInput: { meetingId } }) => {
    const response = await ServerApi.favorites.removeFavorite({
      teamId: TEAM_ID,
      meetingId,
    });
    return response.data;
  });
