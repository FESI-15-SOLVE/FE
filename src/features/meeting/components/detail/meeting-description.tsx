import { FileText } from 'lucide-react';
import { MeetingWithHost } from '@/api/data-contracts';

export interface MeetingDescriptionProps {
  meeting: MeetingWithHost;
}

export function MeetingDescription({ meeting }: MeetingDescriptionProps) {
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-4">
        <FileText className="size-5 text-brand-500" />
        <span>모임 설명</span>
      </div>

      <div className="text-sm sm:text-base text-neutral-700 leading-relaxed whitespace-pre-line min-h-[80px]">
        {meeting.description || '작성된 모임 상세 설명이 없습니다.'}
      </div>
    </div>
  );
}
