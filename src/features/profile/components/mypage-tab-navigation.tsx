'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/mypage/joined', label: '나의 모임' },
  { href: '/mypage/reviews', label: '나의 리뷰' },
  { href: '/mypage/created', label: '내가 만든 모임' },
];

export function MyPageTabNavigation() {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-slate-200">
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'relative py-3 px-4 text-base font-semibold transition-colors cursor-pointer',
              isActive
                ? 'text-green-600 font-bold border-b-2 border-green-500 -mb-0.5'
                : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
