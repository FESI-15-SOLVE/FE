"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import serverApi from "@/api/serverApi";
import { notificationQueryKeys } from "./notification-query-keys";
import { createNotificationRequestParams } from "./notification-request";
import type { NotificationMutationOptions } from "./notification.types";

export function useReadNotificationMutation({
  teamId,
  requestHeaders,
}: NotificationMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await serverApi.notifications.readUpdate(
        { teamId, notificationId },
        createNotificationRequestParams(requestHeaders),
      );
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.all,
      });
    },
  });
}
