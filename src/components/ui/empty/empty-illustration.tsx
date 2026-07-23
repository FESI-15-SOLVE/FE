import Image from "next/image";
import { cn } from "@/lib/utils";

export type EmptyIllustrationProps = React.HTMLAttributes<HTMLDivElement>;

export function EmptyIllustration({
  className,
  ...props
}: EmptyIllustrationProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className,
      )}
      {...props}
    >
      <Image src="/imgs/img_empty.svg" alt="" width={121} height={72} />
    </div>
  );
}

export default EmptyIllustration;
