'use server';

import { z } from 'zod';
import { ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { PresignedUrlRequest } from '@/api/data-contracts';
import { actionClient } from '@/lib/safe-action';

export const getPresignedUrlAction = actionClient
  .inputSchema(z.custom<PresignedUrlRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.images.createPresignedUrl(
      { teamId: TEAM_ID },
      data,
    );
    return response.data;
  });
