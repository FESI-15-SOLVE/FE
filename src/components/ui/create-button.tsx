import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

import icPlus from "@/assets/svg/ic-plus.svg";
import { cn } from "@/lib/utils";

type CreateButtonSize = "small" | "large";
const createButtonSizeVariants: Record<CreateButtonSize, string> = {
  small: "h-12 w-12 rounded-full bg-green-500",
  large: "h-16 w-47 rounded-16 text-xl text-white bg-green-500 gap-1.5",
};

interface CreateButtonProps extends ButtonPrimitive.Props {
  size?: CreateButtonSize;
}

export default function CreateButton({
  size = "small",
  className,
  children,
  ...props
}: CreateButtonProps) {
  return (
    <Button
      variant="custom"
      className={cn(createButtonSizeVariants[size], className)}
      {...props}
    >
      <Image src={icPlus} alt="생성 버튼" />
      {size === "large" && children}
    </Button>
  );
}
