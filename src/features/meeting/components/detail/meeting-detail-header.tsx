import ImageNext from 'next/image';
import { MapPin, Calendar, Clock, User } from 'lucide-react';
import { MeetingWithHost } from '@/api/data-contracts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface MeetingDetailHeaderProps {
  meeting: MeetingWithHost;
}

export function MeetingDetailHeader({ meeting }: MeetingDetailHeaderProps) {
  const formattedDate = meeting.dateTime
    ? format(new Date(meeting.dateTime), 'yyyy년 MM월 dd일 (EEE)', {
        locale: ko,
      })
    : '';

  const formattedTime = meeting.dateTime
    ? format(new Date(meeting.dateTime), 'HH:mm')
    : '';

  const hostName = meeting.host?.name || '호스트';
  const hostImage = meeting.host?.image;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* 좌측 메인 모임 배너 이미지 */}
      <div className="w-full lg:w-1/2 h-80 sm:h-105 relative rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
        {meeting.image ? (
          <ImageNext
            src={meeting.image}
            alt={meeting.name || '모임 대표 이미지'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
            대표 이미지가 없습니다
          </div>
        )}
      </div>

      {/* 우측 모임 주요 정보 카드 */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200 shadow-sm">
        <div className="space-y-4">
          {/* 카테고리 뱃지 & 지역 뱃지 */}
          <div className="flex items-center gap-2">
            {meeting.type && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-600 border border-brand-200">
                {meeting.type}
              </span>
            )}
            {meeting.region && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
                {meeting.region}
              </span>
            )}
          </div>

          {/* 모임 제목 */}
          <h1 className="text-xl sm:text-3xl font-bold text-neutral-900 leading-tight">
            {meeting.name}
          </h1>

          {/* 날짜 & 시간 정보 */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs sm:text-sm text-neutral-700">
            <div className="flex items-center gap-2.5">
              <Calendar className="size-4 text-brand-500 shrink-0" />
              <span>{formattedDate}</span>
              <span className="text-neutral-300">|</span>
              <Clock className="size-4 text-brand-500 shrink-0" />
              <span>{formattedTime}</span>
            </div>

            {/* 장소 요약 */}
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 text-brand-500 shrink-0" />
              <span className="truncate">
                {meeting.address || meeting.region}
              </span>
            </div>
          </div>
        </div>

        {/* 하단 호스트 프로필 정보 */}
        <div className="flex items-center gap-3 pt-6 mt-4 border-t border-neutral-100">
          <div className="size-10 rounded-full overflow-hidden bg-neutral-100 relative shrink-0 border border-neutral-200">
            {hostImage ? (
              <ImageNext
                src={hostImage}
                alt={hostName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <User className="size-5" />
              </div>
            )}
          </div>
          <div className="text-left">
            <p className="text-xs text-neutral-500 font-medium">개설자</p>
            <p className="text-sm font-semibold text-neutral-900">{hostName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
