"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import serverApi from "@/api/serverApi";
import { notificationQueryKeys } from "./notification-query-keys";
import { createNotificationRequestParams } from "./notification-request";
import type { NotificationMutationOptions } from "./notification.types";

export function useReadAllNotificationMutation({
  teamId,
  requestHeaders,
}: NotificationMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await serverApi.notifications.readAllUpdate(
        { teamId },
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
