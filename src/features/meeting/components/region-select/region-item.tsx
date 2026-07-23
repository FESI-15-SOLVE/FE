import { cn } from '@/lib/utils';
import { IconCheck } from '@/components/icons';
import { Button } from '@/components/ui/button';

export interface RegionItemProps {
  label: string;
  isSelected?: boolean;
  variant?: 'city' | 'all';
  onClick: () => void;
}

export function RegionItem({
  label,
  isSelected = false,
  variant = 'city',
  onClick,
}: RegionItemProps) {
  if (variant === 'city') {
    return (
      <button
        type="button"
        className={cn(
          'flex items-center justify-between w-full rounded-lg px-3 py-2 transition-colorsb',
          isSelected ? 'bg-brand-50' : 'hover:bg-neutral-50',
        )}
        onClick={onClick}
      >
        <span
          className={cn(
            'text-sm',
            isSelected ? 'text-brand-500 font-medium' : 'text-neutral-600',
          )}
        >
          {label}
        </span>
        {isSelected && (
          <IconCheck className="size-4 sm:size-5 text-brand-500" />
        )}
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="custom"
      size="custom"
      className={cn(
        'flex items-center justify-between w-full rounded-xl px-3 py-2.5 sm:p-3 transition-colors bg-gray-50 hover:bg-neutral-50',
        isSelected && 'border-gradient-500',
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          'text-sm sm:text-base',
          isSelected ? 'text-brand-500 font-semibold' : 'text-neutral-800',
        )}
      >
        {label}
      </span>
      {isSelected && (
        <IconCheck className="size-4.5 sm:size-6 text-brand-500" />
      )}
    </Button>
  );
}
