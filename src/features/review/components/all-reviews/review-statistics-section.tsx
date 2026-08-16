'use client';

import { RatingDisplay } from '@/components/ui/rating/rating-display';
import { DisplayStatistics } from '../../hooks/use-review-statistics';

interface ReviewStatisticsSectionProps {
  statistics: DisplayStatistics;
}

export function ReviewStatisticsSection({ statistics }: ReviewStatisticsSectionProps) {
  const { averageScore, totalReviews, fiveStars, fourStars, threeStars, twoStars, oneStar } = statistics;

  const starCounts = [
    { label: '5점', count: fiveStars },
    { label: '4점', count: fourStars },
    { label: '3점', count: threeStars },
    { label: '2점', count: twoStars },
    { label: '1점', count: oneStar },
  ];

  const formattedAvg = (averageScore ?? 0).toFixed(1);

  return (
    <div className="w-full bg-linear-to-r from-gradient-start-200 to-gradient-end-200 border border-green-400 rounded-4xl py-8 sm:py-10.25 px-6 sm:px-12 md:px-16 lg:px-30 xl:px-60.25 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-35.5">
      {/* 좌측 영역: 평균 점수 + 하트 평점 + 총 참여 인원 */}
      <div className="flex items-center justify-between md:justify-start gap-8 md:gap-16 w-full md:w-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-display-md font-bold leading-14 tracking-[-0.8px] text-slate-900">
            {formattedAvg}
          </span>

          <div className="flex flex-col items-center gap-1">
            <RatingDisplay
              score={Math.round(averageScore)}
              className="[&_svg]:size-9.5"
            />
            <span className="text-base font-normal leading-6 tracking-[-0.32px] text-slate-500">
              (총 {totalReviews}명 참여)
            </span>
          </div>
        </div>

        {/* 데스크탑 구분선 */}
        <div className="hidden md:block w-px h-35.25 bg-slate-300/70 shrink-0" />
      </div>

      {/* 우측 영역: 5점 ~ 1점 프로그레스 바 목록 */}
      <div className="flex flex-col gap-2 w-full max-w-84.25 shrink-0">
        {starCounts.map(({ label, count }) => {
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          const hasCount = count > 0;

          return (
            <div key={label} className="flex items-center gap-2 text-sm font-medium leading-5 tracking-[-0.28px]">
              <span className={`w-7 shrink-0 text-right ${hasCount ? 'text-green-600' : 'text-slate-600'}`}>
                {label}
              </span>

              {/* 프로그레스 바 트랙 */}
              <div className="flex-1 h-2 bg-slate-200 rounded-md overflow-hidden relative">
                <div
                  className="h-full bg-linear-to-r from-gradient-start-500 to-gradient-end-500 rounded-md transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className={`w-6 shrink-0 text-left ${hasCount ? 'text-green-600' : 'text-slate-600'}`}>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


