'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { cn } from '@/lib/utils';

export type MyPageTabType = 'joined' | 'reviews' | 'created';

const TABS: { id: MyPageTabType; label: string }[] = [
  { id: 'joined', label: '나의 모임' },
  { id: 'reviews', label: '나의 리뷰' },
  { id: 'created', label: '내가 만든 모임' },
];

export function MyPageTabNavigation() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('joined'),
  );

  return (
    <div className="flex border-b border-slate-200">
      {TABS.map((t) => {
        const isActive = tab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'relative py-3 px-4 text-base font-semibold transition-colors cursor-pointer outline-none',
              isActive
                ? 'text-green-600 font-bold border-b-2 border-green-500 -mb-[2px]'
                : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
