import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';
import { formatMeetingDateTime, formatDeadlineText } from '@/lib/date';
import { MeetingWithHost } from '@/api/data-contracts';

export interface InformationContainerProps {
  /** API 모임 데이터 (필수) */
  meeting: MeetingWithHost;
  /** 액션 버튼 클릭 핸들러 (예: 참여하기) */
  onAction?: () => void;
  /** 찜하기 토글 핸들러 */
  onBookmarkToggle?: () => void;
  /** 버튼 텍스트 커스텀 */
  actionText?: string;
  actionDisabled?: boolean;
  className?: string;
}

export const DUMMY_INFORMATION_CONTAINER_MEETING: MeetingWithHost = {
  id: 1,
  teamId: 'dallaem',
  name: '작은 독서 습관 만들기',
  type: '취미/여가',
  region: '중구',
  address: '서울시 중구 자양동 123-45',
  latitude: 37.5407,
  longitude: 127.0693,
  dateTime: '2026-01-07T17:30:00.000Z',
  registrationEnd: '2026-01-07T21:00:00.000Z',
  capacity: 10,
  participantCount: 5,
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
  description: '함께 운동하며 건강을 챙겨요!',
  canceledAt: null,
  confirmedAt: null,
  hostId: 1,
  createdBy: 1,
  createdAt: '2026-02-01T10:00:00.000Z',
  updatedAt: '2026-02-01T10:00:00.000Z',
  host: {
    id: 1,
    name: '홍길동',
    image: 'https://example.com/profile.jpg',
  },
  isFavorited: false,
  isJoined: false,
  isCompleted: false,
};

/**
 * InformationContainer Component
 * Figma Node: 13976:63609 (Information Container)
 *
 * 모바일-데스크톱 반응형(Responsive) 단일 Presentational 컴포넌트.
 */
export function InformationContainer({
  meeting = DUMMY_INFORMATION_CONTAINER_MEETING,
  onAction,
  onBookmarkToggle,
  actionText = '참여하기',
  actionDisabled = false,
  className,
}: InformationContainerProps) {
  const { name, region, type, dateTime, registrationEnd, isFavorited } =
    meeting;

  // 일시 포맷팅
  const { dateText, timeText } = formatMeetingDateTime(dateTime);

  // 마감 태그
  const deadlineText = formatDeadlineText(registrationEnd);

  return (
    <Card
      className={cn(
        /* Figma 픽셀 스펙 기반 반응형 패딩 & 둥글기:
           - 모바일: rounded-2xl (20px), p-5 (20px), gap-6 (24px)
           - 데스크톱 (md 이상): rounded-3xl (32px), p-10 (40px), gap-10 (40px)
        */
        'flex w-full flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:gap-10 md:rounded-3xl md:p-10',
        className,
      )}
    >
      {/* Top Header & Content Area */}
      <div className="flex flex-col gap-6">
        {/* Card Header: Badges & Tags */}
        <CardHeader className="flex flex-col gap-6 p-0">
          {/* Header Tags & Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {deadlineText && (
              <Tag
                variant="accent"
                icon={
                  <svg
                    aria-hidden="true"
                    className="size-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 6 12 16 14" />
                  </svg>
                }
              >
                {deadlineText}
              </Tag>
            )}

            {dateText && <Tag variant="default">{dateText}</Tag>}

            {timeText && <Tag variant="default">{timeText}</Tag>}
          </div>
        </CardHeader>

        {/* Card Content: Title & Location/Type */}
        <CardContent className="flex flex-col gap-3 p-0">
          <CardTitle className="text-xl leading-tight font-semibold tracking-tight text-slate-900 md:text-3xl">
            {name}
          </CardTitle>

          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 md:text-base">
            <span>{region}</span>
            {region && type && <span>·</span>}
            <span>{type}</span>
            <svg
              aria-hidden="true"
              className="ml-0.5 size-4 shrink-0 text-slate-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Action row */}
      <CardFooter className="flex items-center gap-4 p-0">
        {/* 해당 버튼은 현재 구현되지 않았기에 임시로 사용 추후 유틸리티 버튼 구현 시 적용 예정입니다. */}
        <button
          type="button"
          onClick={onBookmarkToggle}
          aria-label="찜하기"
          className="focus-visible:ring-ring relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none md:size-15"
        >
          <svg
            aria-hidden="true"
            className={cn(
              'size-5 transition-colors md:size-8',
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

        {/* Primary Action Button using shadcn/ui Button */}
        <div className="flex-1">
          <Button
            disabled={actionDisabled}
            onClick={onAction}
            className="h-10 w-full rounded-xl text-sm font-semibold md:h-15 md:rounded-2xl md:text-lg"
          >
            {actionText}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
