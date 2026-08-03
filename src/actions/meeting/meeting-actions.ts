'use server';

import { z } from 'zod';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { CreateMeeting, UpdateMeeting } from '@/api/data-contracts';
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

export const updateMeetingAction = actionClient
  .inputSchema(
    z.object({
      meetingId: z.number(),
      data: z.custom<UpdateMeeting>(),
    }),
  )
  .action(async ({ parsedInput: { meetingId, data } }) => {
    const response = await ServerApi.meetings.updateMeeting(
      { teamId: TEAM_ID, meetingId },
      data,
    );
    return response.data;
  });

export const cancelMeetingAction = actionClient
  .inputSchema(z.object({ meetingId: z.number() }))
  .action(async ({ parsedInput: { meetingId } }) => {
    const response = await ServerApi.meetings.updateMeetingStatus(
      { teamId: TEAM_ID, meetingId },
      { status: 'CANCELED' },
    );
    return response.data;
  });
