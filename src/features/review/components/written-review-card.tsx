'use client';

import Image from 'next/image';
import { Rating } from '@/components/ui/rating/rating';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface WrittenReviewCardProps {
  review: {
    id: number;
    score: number;
    comment: string;
    createdAt?: string | null;
    user?: {
      name?: string;
      image?: string | null;
    };
    meeting?: {
      id?: number;
      name?: string;
      type?: string;
      image?: string | null;
      location?: string;
    };
  };
  onEdit: (id: number, score: number, comment: string) => void;
  onDelete: (id: number) => void;
}

export function WrittenReviewCard({
  review,
  onEdit,
  onDelete,
}: WrittenReviewCardProps) {
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'yyyy.MM.dd', { locale: ko })
    : '';

  const meetingImage = review.meeting?.image;
  const meetingName = review.meeting?.name ?? '모임';
  const meetingType = review.meeting?.type;
  const userName = review.user?.name;
  const userImage = review.user?.image;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full bg-white pb-6 pt-4 border-b border-slate-200 last:border-b-0">
      {/* Thumbnail Image Section (Figma: rounded-[24px] 184px) */}
      {meetingImage ? (
        <div className="relative w-full sm:w-46 h-46 shrink-0 rounded-3xl overflow-hidden bg-slate-100">
          <Image
            src={meetingImage}
            alt={meetingName}
            fill
            sizes="(max-width: 640px) 100vw, 184px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="hidden sm:flex w-46 h-46 shrink-0 rounded-3xl bg-slate-100 items-center justify-center text-slate-300 font-medium text-sm">
          No Image
        </div>
      )}

      {/* Main Content & Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0 w-full gap-6">
        {/* Header: Star/Heart Rating + User Profile Avatar & Name & Date */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Rating score={review.score} readOnly size="sm" />
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            {userImage ? (
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src={userImage}
                  alt={userName ?? '사용자 프로필'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : userName ? (
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                <UserIcon className="w-3 h-3" />
              </div>
            ) : null}
            {userName && <span>{userName}</span>}
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Comment Text & Subtitle + Edit/Delete Actions */}
        <div className="flex items-start justify-between gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
              {review.comment}
            </p>

            {/* Subtitle: Meeting Name · Category Type */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
              <span>{meetingName}</span>
              {meetingType && (
                <>
                  <span>·</span>
                  <span>{meetingType}</span>
                </>
              )}
            </div>
          </div>

          {/* Edit / Delete Buttons */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              className="text-xs h-8 px-2.5 rounded-lg text-slate-500 hover:text-slate-900"
              onClick={() => onEdit(review.id, review.score, review.comment)}
            >
              수정
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              className="text-xs h-8 px-2.5 rounded-lg text-rose-500 hover:text-rose-600"
              onClick={() => onDelete(review.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
