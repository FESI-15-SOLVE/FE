'use server';

import { z } from 'zod';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { UpdateUserRequest } from '@/api/data-contracts';
import { actionClient } from '@/lib/safe-action';

export const updateMyProfileAction = actionClient
  .inputSchema(z.custom<UpdateUserRequest>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.users.updateMyProfile(
      { teamId: TEAM_ID },
      data,
    );
    return response.data;
  });
