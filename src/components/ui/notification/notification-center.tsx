"use client";

import { NotificationModal } from "./NotificationModal/notification-modal";
import { NotificationTabs } from "./NotificationTabs/notification-tabs";
import { DEFAULT_EMPTY_MESSAGE } from "./notification.constants";
import type { NotificationModalListSize } from "./NotificationModal/notification-modal.types";
import { mapNotificationItemToViewModel } from "./notification-item-mapper";
import { createAuthorizationHeaders } from "./notification-request";
import type { NotificationItem } from "./notification.types";
import { useNotificationListQuery } from "./use-notification-list-query";
import { useReadAllNotificationMutation } from "./use-read-all-notification-mutation";
import { useReadNotificationMutation } from "./use-read-notification-mutation";

interface NotificationCenterProps {
  teamId: string;
  accessToken?: string;
  listSize?: NotificationModalListSize;
  emptyMessage?: string;
  onNotificationClick?: (notificationItem: NotificationItem) => void;
}

function getNotificationCenterMessage({
  hasToken,
  isLoading,
  isError,
  emptyMessage,
}: {
  hasToken: boolean;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
}): string {
  if (!hasToken) {
    return "로그인이 필요해요";
  }

  if (isLoading) {
    return "알림을 불러오는 중이에요";
  }

  if (isError) {
    return "알림을 불러오지 못했어요";
  }

  return emptyMessage ?? DEFAULT_EMPTY_MESSAGE;
}

export function NotificationCenter({
  teamId,
  accessToken,
  listSize = "short",
  emptyMessage,
  onNotificationClick,
}: NotificationCenterProps) {
  const hasToken = Boolean(accessToken);
  const requestHeaders = createAuthorizationHeaders(accessToken);

  const notificationListQuery = useNotificationListQuery({
    teamId,
    size: 20,
    requestHeaders,
    enabled: hasToken,
  });
  const readAllNotificationMutation = useReadAllNotificationMutation({
    teamId,
    requestHeaders,
  });
  const readNotificationMutation = useReadNotificationMutation({
    teamId,
    requestHeaders,
  });

  const notificationItems = notificationListQuery.data?.data ?? [];
  const hasNotificationItems = notificationItems.length > 0;
  const shouldShowEmpty = !hasToken || !hasNotificationItems;

  const handleReadAll = () => {
    if (!hasToken || !hasNotificationItems) {
      return;
    }
    readAllNotificationMutation.mutate();
  };

  const handleNotificationClick = (notificationItem: NotificationItem) => {
    if (!notificationItem.isRead) {
      readNotificationMutation.mutate(notificationItem.id);
    }
    onNotificationClick?.(notificationItem);
  };

  return (
    <NotificationModal
      listSize={listSize}
      isEmpty={shouldShowEmpty}
      emptyMessage={getNotificationCenterMessage({
        hasToken,
        isLoading: notificationListQuery.isLoading,
        isError: notificationListQuery.isError,
        emptyMessage,
      })}
      onReadAll={handleReadAll}
      isReadAllDisabled={
        !hasToken ||
        !hasNotificationItems ||
        readAllNotificationMutation.isPending
      }
    >
      {notificationItems.map((notificationItem) => {
        const notificationTabsItem =
          mapNotificationItemToViewModel(notificationItem);

        return (
          <NotificationTabs
            key={notificationTabsItem.id}
            notificationType={notificationTabsItem.notificationType}
            message={notificationTabsItem.message}
            imageSrc={notificationTabsItem.imageSrc}
            createdAt={notificationTabsItem.createdAt}
            isRead={notificationTabsItem.isRead}
            onClick={() => handleNotificationClick(notificationItem)}
          />
        );
      })}
    </NotificationModal>
  );
}
