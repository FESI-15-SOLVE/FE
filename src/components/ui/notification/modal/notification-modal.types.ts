import type { HTMLAttributes, ReactNode } from "react";

import type { NotificationModalListSize } from "../notification-dimensions";

export type { NotificationModalListSize };

export interface NotificationModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  readAllLabel?: string;
  emptyMessage?: string;
  isEmpty?: boolean;
  onReadAll?: () => void;
  isReadAllDisabled?: boolean;
  listSize?: NotificationModalListSize;
  children?: ReactNode;
}
