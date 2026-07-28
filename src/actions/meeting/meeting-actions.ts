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

export const joinMeetingAction = actionClient
  .inputSchema(z.object({ meetingId: z.number() }))
  .action(async ({ parsedInput: { meetingId } }) => {
    const response = await ServerApi.meetings.joinMeeting({
      teamId: TEAM_ID,
      meetingId,
    });
    return response.data;
  });

export const leaveMeetingAction = actionClient
  .inputSchema(z.object({ meetingId: z.number() }))
  .action(async ({ parsedInput: { meetingId } }) => {
    const response = await ServerApi.meetings.leaveMeeting({
      teamId: TEAM_ID,
      meetingId,
    });
    return response.data;
  });
