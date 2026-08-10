'use server';

import { actionClient } from '@/lib/safe-action';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { z } from 'zod';

const markReadSchema = z.object({
  notificationId: z.number(),
});

const deleteNotificationSchema = z.object({
  notificationId: z.number(),
});

export const markNotificationAsReadAction = actionClient
  .schema(markReadSchema)
  .action(async ({ parsedInput: { notificationId } }) => {
    const res = await ServerApi.notifications.markNotificationAsRead({
      teamId: TEAM_ID,
      notificationId,
    });
    return res.data;
  });

export const markAllNotificationsAsReadAction = actionClient
  .action(async () => {
    const res = await ServerApi.notifications.markAllNotificationsAsRead({
      teamId: TEAM_ID,
    });
    return res.data;
  });

export const deleteNotificationAction = actionClient
  .schema(deleteNotificationSchema)
  .action(async ({ parsedInput: { notificationId } }) => {
    const res = await ServerApi.notifications.deleteNotification({
      teamId: TEAM_ID,
      notificationId,
    });
    return res.data;
  });

export const deleteAllNotificationsAction = actionClient
  .action(async () => {
    const res = await ServerApi.notifications.deleteAllNotifications({
      teamId: TEAM_ID,
    });
    return res.data;
  });
