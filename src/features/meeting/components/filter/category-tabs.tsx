'use client';

import { cn } from '@/lib/utils';
import { CATEGORIES_WITH_ALL } from '@/constants/categories';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (name: string) => void;
}

const checkIsCategoryActive = (
  categoryName: string,
  activeCategory: string,
) => {
  if (categoryName === '전체') {
    return !activeCategory || activeCategory === '전체';
  }
  return categoryName === activeCategory;
};

export function CategoryTabs({
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const handleCategoryClick = (categoryName: string) => {
    onSelectCategory(categoryName === '전체' ? '' : categoryName);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      {CATEGORIES_WITH_ALL.map((cat) => {
        const isActive = checkIsCategoryActive(cat.name, activeCategory);

        return (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
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
