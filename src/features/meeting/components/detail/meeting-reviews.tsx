import { Star, MessageSquare } from 'lucide-react';

export interface ReviewItem {
  id: number;
  userScore?: number;
  comment?: string;
  createdAt?: string;
  user?: {
    name?: string;
    image?: string;
  };
}

export interface MeetingReviewsProps {
  reviews?: ReviewItem[];
}

export function MeetingReviews({ reviews = [] }: MeetingReviewsProps) {
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-neutral-900">
          <MessageSquare className="size-5 text-brand-500" />
          <span>리뷰 모아보기</span>
          <span className="text-sm font-normal text-neutral-500">
            ({reviews.length}개)
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-400 space-y-2">
          <Star className="size-8 text-neutral-200" />
          <p className="text-sm">아직 작성된 리뷰가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-600 font-semibold">
                    {review.user?.name?.[0] || '유'}
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">
                    {review.user?.name || '익명'}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{review.userScore || 5}.0</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
