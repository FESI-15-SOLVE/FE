"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import serverApi from "@/api/serverApi";
import { createRequestParams } from "@/lib/api/request-headers";

import type {
  NotificationListQueryOptions,
  NotificationMutationOptions,
  UnreadNotificationCountQueryOptions,
} from "./notification.types";

const DEFAULT_PAGE_SIZE = 20;

/**
 * React Query 캐시 키.
 * 읽음 처리 후 invalidate할 때 all을 쓰면 목록·미읽음 수가 함께 갱신됩니다.
 */
export const notificationQueryKeys = {
  all: ["notification"] as const,
  list: (
    teamId: string,
    options: {
      size: number;
      isRead?: "true" | "false";
    },
  ) => [...notificationQueryKeys.all, "list", teamId, options] as const,
  unreadCount: (teamId: string) =>
    [...notificationQueryKeys.all, "unread-count", teamId] as const,
};

/** 알림 목록 조회 (GET /notifications) */
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
        createRequestParams(requestHeaders),
      );
      return response.data;
    },
  });
}

/** 미읽음 알림 개수 조회 (벨 뱃지용) */
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
        createRequestParams(requestHeaders),
      );
      return response.data.count;
    },
  });
}

/** 특정 알림 1건 읽음 처리 */
export function useReadNotificationMutation({
  teamId,
  requestHeaders,
}: NotificationMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await serverApi.notifications.readUpdate(
        { teamId, notificationId },
        createRequestParams(requestHeaders),
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

/** 모든 미읽음 알림 읽음 처리 ("모두 읽기") */
export function useReadAllNotificationMutation({
  teamId,
  requestHeaders,
}: NotificationMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await serverApi.notifications.readAllUpdate(
        { teamId },
        createRequestParams(requestHeaders),
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
