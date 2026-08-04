'use client';

import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card/card';
import { UtilityButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MeetingWithHost } from '@/api/data-contracts';
import { useMeetingCardActions } from '../../hooks/use-meeting-card-actions';
import { DetailCardActionButton } from '../detail-card-action-button';

export interface DetailCardProps {
  /** API에서 전달받는 모임 데이터 (MeetingWithHost 또는 JoinedMeeting) */
  meeting: MeetingWithHost & { isReviewed?: boolean };
  className?: string;
}

/**
 * DetailCard Component
 * Figma Node: 13976:63499 (Detail Card)
 *
 * meeting 객체 중심의 마이페이지/세부 모임 정보 카드 컴포넌트.
 */
export function DetailCard({ meeting, className }: DetailCardProps) {
  const {
    isHost,
    isJoined,
    isSaved,
    isCanceled,
    isCompleted,
    isConfirmed,
    isRegistrationClosed,
    formattedDate,
    formattedTime,
    handleSaveClick,
    handleJoinClick,
    handleCardClick,
    isJoinPending,
  } = useMeetingCardActions(meeting, { defaultIsJoined: true });

  const { name, image, participantCount, capacity, region, isReviewed } = meeting;

  // 상태 바지 텍스트 ("이용 완료" | "이용 예정")
  const statusBadgeText = isCompleted ? '이용 완료' : '이용 예정';

  // 개설 확정/대기 바지 텍스트 ("개설 확정" | "개설 대기")
  const subBadgeText = isConfirmed ? '개설 확정' : '개설 대기';

  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        'flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all cursor-pointer hover:shadow-md sm:flex-row sm:items-stretch sm:gap-6 sm:rounded-3xl sm:p-6',
        className,
      )}
    >
      {/* Thumbnail Image Section */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-47 sm:w-47">
        {image ? (
          <Image
            src={image}
            alt={name ?? '모임 이미지'}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm text-slate-400">
            No Image
          </div>
        )}

        {/* Bookmark Overlay Heart Button */}
        <div className="absolute top-3 right-3 z-10">
          <UtilityButton
            size="sm"
            onClick={handleSaveClick}
            isActive={isSaved}
          />
        </div>
      </div>

      {/* Main Details Section */}
      <div className="flex h-full w-full flex-1 flex-col justify-between gap-4 sm:h-47">
        {/* Header Section: Badges & Title */}
        <CardHeader className="flex flex-col gap-3 p-0">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-700 md:text-sm">
              {statusBadgeText}
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 md:text-sm">
              {subBadgeText}
            </span>
          </div>

          {/* Title */}
          <CardTitle className="text-lg leading-snug font-semibold tracking-tight text-slate-900 md:text-xl">
            {name}
          </CardTitle>
        </CardHeader>

        {/* Content & Footer Wrapper */}
        <div className="flex flex-col justify-between gap-4 pt-1 sm:flex-row sm:items-center">
          {/* Content Section: Personnel Count & Location/Date/Time */}
          <CardContent className="flex flex-col justify-between gap-1.5 p-0 text-xs md:text-sm">
            {/* Personnel Count */}
            <div className="flex items-center gap-1.5 font-medium text-slate-900">
              <span>
                {participantCount}/{capacity}
              </span>
              <svg
                aria-hidden="true"
                className="size-4 text-slate-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 00-5 5v1h11v-1a5 5 0 00-5-5z" />
              </svg>
            </div>

            {/* Meta Row: Location | Date | Time */}
            <div className="flex flex-wrap items-center gap-2 font-medium text-slate-600">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">위치</span>
                <span>{region}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">날짜</span>
                <span>{formattedDate}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">시간</span>
                <span>{formattedTime}</span>
              </div>
            </div>
          </CardContent>

          {/* Footer Section: Action Button */}
          <CardFooter className="w-full shrink-0 p-0 sm:w-auto sm:self-end">
            <DetailCardActionButton
              isCanceled={isCanceled}
              isHost={isHost}
              isCompleted={isCompleted}
              isReviewed={isReviewed}
              isJoined={isJoined}
              isRegistrationClosed={isRegistrationClosed}
              isPending={isJoinPending}
              onClick={handleJoinClick}
              className="h-11 w-full min-w-36 sm:h-12 sm:w-auto"
            />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
