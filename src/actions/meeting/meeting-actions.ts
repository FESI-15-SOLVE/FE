'use server';

import { z } from 'zod';
import { ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { CreateMeeting } from '@/api/data-contracts';
import { actionClient } from '@/lib/safe-action';

export const createMeetingAction = actionClient
  .inputSchema(z.custom<CreateMeeting>())
  .action(async ({ parsedInput: data }) => {
    const response = await ServerApi.meetings.createMeeting(
      { teamId: TEAM_ID },
      data,
    );
    return response.data;
  });
