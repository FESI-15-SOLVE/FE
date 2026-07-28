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
