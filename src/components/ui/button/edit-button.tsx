import { cn } from '@/lib/utils';
import IconEdit from '@/assets/icons/edit.svg';
import { Button } from './button';

export type EditButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function EditButton({ className, ...props }: EditButtonProps) {
  return (
    <Button
      variant="tertiary"
      size="icon-sm"
      className={cn('rounded-full', className)}
      {...props}
    >
      <IconEdit className="size-6" />
    </Button>
  );
}
