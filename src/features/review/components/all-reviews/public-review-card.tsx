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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full bg-white pb-6 pt-4 border-b border-slate-200 last:border-b-0">
      {/* 썸네일 이미지 (Figma 184px x 184px, rounded-3xl) */}
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

      {/* 오른쪽 콘텐츠 영역 */}
      <div className="flex flex-col justify-center flex-1 min-w-0 w-full gap-6 pb-6 pt-4">
        {/* 헤더: 평점 하트 + 프로필 아바타 & 작성일 */}
        <div className="flex flex-col gap-1.5">
          <RatingDisplay score={review.score} size="md" />

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-normal leading-5 tracking-[-0.28px]">
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
            <div className="flex items-center gap-2">
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* 리뷰 본문 내용 및 모임 정보 서브타이틀 */}
        <div className="flex flex-col gap-2 w-full">
          <p className="px-0.5 text-base sm:text-lg font-normal leading-7 text-slate-700 tracking-[-0.36px] whitespace-pre-wrap break-words">
            {review.comment}
          </p>

          <div className="flex items-center gap-1 px-0.5 text-xs sm:text-sm font-medium leading-5 tracking-[-0.28px] text-slate-500">
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

