'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { User as UserIcon } from 'lucide-react';
import { RatingDisplay } from '@/components/ui/rating/rating-display';
import { ReviewWithDetails } from '@/api/data-contracts';

export interface PublicReviewCardProps {
  review: ReviewWithDetails;
}

export function PublicReviewCard({ review }: PublicReviewCardProps) {
  const formattedDate = review.createdAt
    ? format(new Date(review.createdAt), 'yyyy.MM.dd', { locale: ko })
    : '';

  const meetingImage = review.meeting?.image;
  const meetingName = review.meeting?.name ?? '모임';
  const meetingType = review.meeting?.type;
  const userName = review.user?.name ?? '익명';
  const userImage = review.user?.image;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 w-full bg-white pb-6 pt-4 border-b border-slate-200 last:border-b-0">
      {/* 썸네일 이미지 */}
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

      {/* 본문 콘텐츠 */}
      <div className="flex flex-col justify-between flex-1 min-w-0 w-full gap-4 sm:gap-6">
        {/* 헤더: 평점 하트 + 프로필 아바타 & 작성일 */}
        <div className="flex flex-col gap-1.5">
          <RatingDisplay score={review.score} size="md" />

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            {userImage ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src={userImage}
                  alt={userName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
            )}
            <span>{userName}</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* 리뷰 내용 및 서브타이틀 */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed whitespace-pre-wrap break-words">
            {review.comment}
          </p>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium pt-1">
            <span>{meetingName}</span>
            {meetingType && (
              <>
                <span>·</span>
                <span>{meetingType}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
