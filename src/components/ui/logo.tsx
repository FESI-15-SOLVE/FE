import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LogoLg from '@/assets/imgs/img_logo_lg.svg?url';
import LogoSm from '@/assets/imgs/img_logo_sm.svg?url';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'lg';
}

export function Logo({ className, size = 'lg' }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center shrink-0', className)}>
      <Image
        src={size === 'lg' ? LogoLg : LogoSm}
        alt="같이달램 로고"
        width={size === 'lg' ? 96 : 67}
        height={size === 'lg' ? 23 : 16}
        className="w-auto h-auto object-contain"
        priority
      />
    </Link>
  );
}
