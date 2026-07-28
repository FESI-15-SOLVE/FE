'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export interface MeetingJoinButtonProps {
  isCanceled: boolean;
  isJoined: boolean;
  isFull: boolean;
  isRegistrationClosed: boolean;
  isPending: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'lg' | 'md';
  mode?: 'detail' | 'list';
}

type ButtonStatus = 'canceled' | 'joined' | 'full' | 'closed' | 'joinable';

const STATUS_CONFIG: Record<
  ButtonStatus,
  {
    label: string;
    shortLabel: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    interactive: boolean;
    extraClassName?: string;
  }
> = {
  canceled: {
    label: '취소된 모임',
    shortLabel: '취소됨',
    variant: 'tertiary',
    interactive: false,
  },
  joined: {
    label: '참여 취소하기',
    shortLabel: '참여 취소',
    variant: 'secondary',
    interactive: true,
    extraClassName: 'text-neutral-700 hover:bg-neutral-100',
  },
  full: {
    label: '정원이 마감되었습니다',
    shortLabel: '정원 마감',
    variant: 'tertiary',
    interactive: false,
  },
  closed: {
    label: '모집 기한이 종료되었습니다',
    shortLabel: '모집 마감',
    variant: 'tertiary',
    interactive: false,
  },
  joinable: { 
    label: '참여하기', 
    shortLabel: '참여하기',
    variant: 'primary', 
    interactive: true 
  },
};

export function MeetingJoinButton({
  isCanceled,
  isJoined,
  isFull,
  isRegistrationClosed,
  isPending,
  onClick,
  className,
  size = 'lg',
  mode = 'detail',
}: MeetingJoinButtonProps) {
  let status: ButtonStatus = 'joinable';
  if (isCanceled) status = 'canceled';
  else if (isJoined) status = 'joined';
  else if (isFull) status = 'full';
  else if (isRegistrationClosed) status = 'closed';

  const config = STATUS_CONFIG[status];
  const displayText = mode === 'list' ? config.shortLabel : config.label;

  return (
    <Button
      variant={config.variant}
      disabled={!config.interactive || isPending}
      onClick={config.interactive ? onClick : undefined}
      size={size}
      className={cn('font-semibold shrink-0', config.extraClassName, className)}
    >
      {displayText}
    </Button>
  );
}
