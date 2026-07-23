import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatMeetingDateTime } from '@/lib/date';
import { MeetingWithHost } from '@/api/data-contracts';

export interface DetailCardProps {
  /** API에서 전달받는 모임 데이터 (MeetingWithHost) */
  meeting: MeetingWithHost;
  /** 액션 버튼 클릭 핸들러 (예: 예약 취소, 참여하기 등) */
  onAction?: () => void;
  /** 찜하기 토글 핸들러 */
  onBookmarkToggle?: () => void;
  /** 버튼 텍스트 커스텀 */
  actionText?: string;
  actionVariant?: 'default' | 'secondary' | 'tertiary' | 'ghost';
  actionDisabled?: boolean;
  className?: string;
}

export const DUMMY_DETAIL_CARD_MEETING: MeetingWithHost = {
  id: 1,
  teamId: 'dallaem',
  name: '달램핏 오피스 스트레칭',
  type: '달램핏',
  region: '을지로 3가',
  address: '서울시 중구 을지로 3가',
  latitude: 37.5665,
  longitude: 126.978,
  dateTime: '2026-11-17T17:30:00.000Z',
  registrationEnd: '2026-11-16T23:59:59.000Z',
  capacity: 20,
  participantCount: 20,
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
  description: '달램핏 스트레칭',
  canceledAt: null,
  confirmedAt: '2026-11-10T10:00:00.000Z',
  hostId: 1,
  createdBy: 1,
  createdAt: '2026-11-01T10:00:00.000Z',
  updatedAt: '2026-11-01T10:00:00.000Z',
  host: {
    id: 1,
    name: '홍길동',
    image: 'https://example.com/profile.jpg',
  },
  isFavorited: true,
  isJoined: true,
  isCompleted: false,
};

/**
 * DetailCard Component
 * Figma Node: 13976:63499 (Detail Card)
 *
 * meeting 객체 중심의 반응형 모임 정보 카드 컴포넌트.
 */
export function DetailCard({
  meeting = DUMMY_DETAIL_CARD_MEETING,
  onAction,
  onBookmarkToggle,
  actionText,
  actionVariant,
  actionDisabled = false,
  className,
}: DetailCardProps) {
  const {
    name,
    image,
    participantCount,
    capacity,
    region,
    dateTime,
    confirmedAt,
    isCompleted,
    isFavorited,
    isJoined,
  } = meeting;

  // 상태 바지 텍스트 ("이용 완료" | "이용 예정")
  const statusBadgeText = isCompleted ? '이용 완료' : '이용 예정';

  // 개설 확정/대기 바지 텍스트 ("개설 확정" | "개설 대기")
  const subBadgeText = confirmedAt ? '개설 확정' : '개설 대기';

  // 일시 포맷팅 (공통 유틸 활용)
  const { dateText, timeText } = formatMeetingDateTime(dateTime);

  // 액션 버튼 텍스트 및 변형(variant)
  const resolvedActionText =
    actionText ?? (isJoined ? '예약 취소하기' : '참여하기');
  const resolvedActionVariant =
    actionVariant ?? (isJoined ? 'secondary' : 'default');

  return (
    <Card
      className={cn(
        /* Figma 픽셀 스펙 기반 반응형 패딩 & 둥글기:
           - 모바일: rounded-2xl (20px), p-5 (20px), gap-4 (16px), flex-col
           - 데스크톱 (sm 이상): rounded-3xl (32px), p-6 (24px), gap-6 (24px), flex-row
        */
        'flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all sm:flex-row sm:items-stretch sm:gap-6 sm:rounded-3xl sm:p-6',
        className,
      )}
    >
      {/* Thumbnail Image Section */}
      <div
        className={cn(
          'relative h-44 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-47 sm:w-47',
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={name ?? '모임 이미지'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm text-slate-400">
            No Image
          </div>
        )}

        {/* Bookmark Overlay Heart Button */}
        <button
          type="button"
          onClick={onBookmarkToggle}
          aria-label="찜하기"
          className="absolute top-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-xs backdrop-blur-xs transition-colors hover:bg-white focus-visible:outline-none"
        >
          <svg
            aria-hidden="true"
            className={cn(
              'size-5 transition-colors',
              isFavorited
                ? 'fill-red-500 stroke-red-500 text-red-500'
                : 'fill-none stroke-current',
            )}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
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
                <span>{dateText}</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-400">시간</span>
                <span>{timeText}</span>
              </div>
            </div>
          </CardContent>

          {/* Footer Section: Action Button */}
          <CardFooter className="w-full shrink-0 p-0 sm:w-auto sm:self-end">
            <Button
              variant={resolvedActionVariant}
              disabled={actionDisabled}
              onClick={onAction}
              className="h-11 w-full min-w-36 sm:h-12 sm:w-auto"
            >
              {resolvedActionText}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
