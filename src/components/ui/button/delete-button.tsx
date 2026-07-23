import { cn } from "@/lib/utils";
import { IconDelete } from "@/components/icons";
import { Button } from "./button";

export type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton({ className, ...props }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      className={cn(
        "size-4.5 rounded-full p-0 bg-black/80 text-white hover:bg-black",
        className
      )}
      {...props}
    >
      <IconDelete className="size-2.5" />
    </Button>
  );
}
