import { cn } from '@/lib/utils';
import IconHeart from '@/assets/icons/heart.svg';
import { Button } from './button';

export type UtilityButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'lg' | 'md' | 'sm';
    isActive?: boolean;
  };

export function UtilityButton({
  className,
  size = 'md',
  isActive = false,
  ...props
}: UtilityButtonProps) {
  const sizeClass =
    size === 'lg' ? 'size-15' : size === 'sm' ? 'size-10' : 'size-12';

  return (
    <Button
      variant="tertiary"
      className={cn(
        'rounded-full shadow-sm border-slate-100 p-0',
        sizeClass,
        className,
      )}
      {...props}
    >
      <IconHeart
        className={cn(
          'transition-colors',
          size === 'lg' ? 'size-8' : size === 'sm' ? 'size-5' : 'size-6',
          isActive ? 'text-green-500' : 'stroke-slate-400 text-white',
        )}
      />
    </Button>
  );
}
