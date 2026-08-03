import Image from 'next/image';
import img_saved_lg from '@/assets/imgs/img_saved_lg.svg?url';

export function SavedBanner() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 py-2">
      <div className="relative w-20 h-16 sm:w-25 sm:h-20 shrink-0">
        <Image
          src={img_saved_lg}
          alt="찜한 모임 아이콘"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          찜한 모임
        </h1>
        <p className="text-sm sm:text-xl text-neutral-400 font-medium">
          마감되기 전에 지금 바로 참여해보세요 👀
        </p>
      </div>
    </div>
  );
}
