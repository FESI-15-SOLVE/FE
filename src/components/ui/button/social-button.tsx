import { cn } from '@/lib/utils';
import { IconKakao, IconGoogle } from '@/components/icons';
import type { ElementType } from 'react';
import { Button } from './button';

const SOCIAL_CONFIG: Record<
  string,
  {
    label: string;
    className: string;
    icon: ElementType;
    iconClassName?: string;
  }
> = {
  kakao: {
    label: '카카오로 계속하기',
    className: 'bg-[#ffee01] hover:bg-[#e6d600] text-slate-800',
    icon: IconKakao,
  },
  google: {
    label: '구글로 계속하기',
    className:
      'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50',
    icon: IconGoogle,
  },
};

export type SocialProvider = keyof typeof SOCIAL_CONFIG;

export type SocialButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    social?: SocialProvider;
  };

export function SocialButton({
  className,
  social = 'google',
  ...props
}: SocialButtonProps) {
  const config = SOCIAL_CONFIG[social];
  const Icon = config.icon;

  return (
    <Button
      variant="ghost"
      className={cn(
        'w-56 px-4 py-3 rounded-xl text-base font-semibold gap-3 h-auto',
        config.className,
        className,
      )}
      {...props}
    >
      <Icon className={cn('size-6 shrink-0', config.iconClassName)} />
      <span>{config.label}</span>
    </Button>
  );
}
