import { cn } from '@/lib/utils';
import { IconPlus } from '@/components/icons';
import { Button } from './button';

export type CreateButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'lg' | 'sm';
    children?: React.ReactNode;
  };

export function CreateButton({
  className,
  size = 'lg',
  children,
  ...props
}: CreateButtonProps) {
  const isLarge = size === 'lg';

  return (
    <Button
      variant="primary"
      className={cn(
        'rounded-3xl font-bold',
        isLarge
          ? 'h-16 px-7 py-4 w-47 text-xl gap-1.5'
          : 'size-12 px-0 py-0 rounded-full',
        className,
      )}
      {...props}
    >
      <IconPlus className={cn('shrink-0', isLarge ? 'size-8' : 'size-8')} />
      {isLarge && children}
    </Button>
  );
}
