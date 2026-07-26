import Image from 'next/image';
import img_banner_lg from '@/assets/imgs/img_banner_lg.svg?url';

export function MeetingBanner() {
  return (
    <div className="relative w-full h-61 bg-green-300 rounded-2xl   text-white overflow-hidden shadow-sm flex justify-between">
      <div className="relative z-10 max-w-md flex flex-col justify-center h-full p-6 md:p-10">
        <p className="text-sm md:text-base font-medium opacity-90 mb-1 text-green-700">
          함께할 사람을 찾고 계신가요?
        </p>
        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-black">
          지금 모임에 참여해보세요
        </h2>
      </div>
      <div className=" relative w-130 h-80 pr-6">
        <Image src={img_banner_lg} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}
