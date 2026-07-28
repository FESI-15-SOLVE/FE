"use client";

import { useQuery } from "@tanstack/react-query";

import serverApi from "@/api/serverApi";
import { notificationQueryKeys } from "./notification-query-keys";
import { createNotificationRequestParams } from "./notification-request";

interface UnreadNotificationCountQueryOptions {
  teamId: string;
  requestHeaders?: HeadersInit;
  enabled?: boolean;
}

export function useUnreadNotificationCountQuery({
  teamId,
  requestHeaders,
  enabled = true,
}: UnreadNotificationCountQueryOptions) {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount(teamId),
    enabled: enabled && Boolean(teamId),
    queryFn: async () => {
      const response = await serverApi.notifications.unreadCountList(
        { teamId },
        createNotificationRequestParams(requestHeaders),
      );
      return response.data.count;
    },
  });
}
