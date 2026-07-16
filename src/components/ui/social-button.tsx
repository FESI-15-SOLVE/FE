import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

import icGoogle from "@/assets/svg/ic-google.svg";
import icKakao from "@/assets/svg/ic-kakao.svg";
import { cn } from "@/lib/utils";

type SocialButtonType = "google" | "kakao";

const socialButtonConfig: Record<
  SocialButtonType,
  { icon: StaticImageData; text: string; bgClassName: string }
> = {
  google: { icon: icGoogle, text: "구글", bgClassName: "bg-white" },
  kakao: { icon: icKakao, text: "카카오", bgClassName: "bg-[#FFEE01]" },
};

const commonClassName = "bg-background text-slate-800 gap-3";

interface SocialButtonProps extends ButtonPrimitive.Props {
  snsType: SocialButtonType;
}

export default function SocialButton({
  snsType,
  className,
  ...props
}: SocialButtonProps) {
  const { icon, text, bgClassName } = socialButtonConfig[snsType];

  return (
    <Button
      className={cn(commonClassName, bgClassName, className)}
      variant="custom"
      {...props}
    >
      <Image src={icon} alt="" />
      {`${text}로 계속하기`}
    </Button>
  );
}
