"use client";

import { useQuery } from "@tanstack/react-query";

import serverApi from "@/api/serverApi";
import type { NotificationListQueryOptions } from "./notification.types";
import { notificationQueryKeys } from "./notification-query-keys";
import { createNotificationRequestParams } from "./notification-request";

const DEFAULT_PAGE_SIZE = 20;

export function useNotificationListQuery({
  teamId,
  cursor,
  size = DEFAULT_PAGE_SIZE,
  isRead,
  requestHeaders,
  enabled = true,
}: NotificationListQueryOptions) {
  return useQuery({
    queryKey: notificationQueryKeys.list(teamId, { size, isRead }),
    enabled: enabled && Boolean(teamId),
    queryFn: async () => {
      const response = await serverApi.notifications.notificationsList(
        { teamId, cursor, size, isRead },
        createNotificationRequestParams(requestHeaders),
      );
      return response.data;
    },
  });
}
