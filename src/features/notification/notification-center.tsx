"use client";

import {
  DEFAULT_EMPTY_MESSAGE,
  NotificationModal,
  NotificationTabs,
  type NotificationModalListSize,
} from "@/components/ui/notification";
import { createAuthorizationHeaders } from "@/lib/api/request-headers";

import {
  mapNotificationItemToViewModel,
  type NotificationItem,
} from "./notification.types";
import {
  useNotificationListQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "./use-notification-api";

interface NotificationCenterProps {
  teamId: string;
  accessToken?: string;
  listSize?: NotificationModalListSize;
  emptyMessage?: string;
  /** 알림 클릭 후 이동 등 상위 동작을 연결할 때 사용 */
  onNotificationClick?: (notificationItem: NotificationItem) => void;
}

/** 토큰/로딩/에러 상태에 맞는 empty 문구를 고릅니다. */
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

/**
 * 알림 기능 컨테이너.
 * - API 조회/읽음 처리 훅을 호출하고
 * - 결과를 NotificationModal + NotificationTabs(UI)에 연결합니다.
 *
 * 헤더 벨 아이콘 등에서 이 컴포넌트만 꽂으면 됩니다.
 */
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
