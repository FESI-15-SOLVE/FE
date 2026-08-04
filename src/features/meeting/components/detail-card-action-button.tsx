'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DetailCardActionButtonProps {
  isCanceled: boolean;
  isHost?: boolean;
  isCompleted?: boolean;
  isReviewed?: boolean;
  isJoined: boolean;
  isRegistrationClosed: boolean;
  isPending: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

type ButtonStatus =
  | 'canceled'
  | 'hosted'
  | 'reviewed'
  | 'reviewable'
  | 'joined'
  | 'closed'
  | 'joinable';

const STATUS_CONFIG: Record<
  ButtonStatus,
  {
    label: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    interactive: boolean;
  }
> = {
  canceled: {
    label: '취소된 모임',
    variant: 'tertiary',
    interactive: false,
  },
  hosted: {
    label: '공유하기',
    variant: 'primary',
    interactive: true,
  },
  reviewed: {
    label: '작성 완료',
    variant: 'tertiary',
    interactive: false,
  },
  reviewable: {
    label: '리뷰 작성하기',
    variant: 'primary',
    interactive: true,
  },
  joined: {
    label: '예약 취소하기',
    variant: 'secondary',
    interactive: true,
  },
  closed: {
    label: '모집 마감',
    variant: 'tertiary',
    interactive: false,
  },
  joinable: {
    label: '참여하기',
    variant: 'primary',
    interactive: true,
  },
};

export function DetailCardActionButton({
  isCanceled,
  isHost = false,
  isCompleted = false,
  isReviewed = false,
  isJoined = true,
  isRegistrationClosed,
  isPending,
  onClick,
  className,
}: DetailCardActionButtonProps) {
  let status: ButtonStatus = 'joinable';
  if (isCanceled) status = 'canceled';
  else if (isCompleted) status = isReviewed ? 'reviewed' : 'reviewable';
  else if (isHost) status = 'hosted';
  else if (isJoined) status = 'joined';
  else if (isRegistrationClosed) status = 'closed';
  else status = 'joinable';

  const config = STATUS_CONFIG[status];

  return (
    <Button
      variant={config.variant}
      disabled={!config.interactive || isPending}
      onClick={config.interactive ? onClick : undefined}
      className={cn('font-semibold shrink-0', className)}
    >
      {config.label}
    </Button>
  );
}
