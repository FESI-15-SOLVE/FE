'use client';

import { cn } from '@/lib/utils';
import { CATEGORIES_WITH_ALL } from '@/constants/categories';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (name: string) => void;
}

export function CategoryTabs({
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      {CATEGORIES_WITH_ALL.map((cat) => {
        const isAll = cat.name === '전체';
        const isActive = isAll
          ? !activeCategory || activeCategory === '전체'
          : activeCategory === cat.name;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(isAll ? '' : cat.name)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer',
              isActive
                ? 'bg-zinc-900 text-white '
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 ',
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
