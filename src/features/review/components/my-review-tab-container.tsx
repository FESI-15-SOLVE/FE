'use client';

import { useState, Suspense } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  meetingQueries,
  JOINED_WRITABLE_PARAMS,
} from '@/features/meeting/queries/meeting-query';
import { reviewQueries } from '../queries/review-query';
import { DetailCard } from '@/features/meeting/components/cards/detail-card';
import { WrittenReviewCard } from './written-review-card';
import { EmptyReviewState } from './empty-review-state';
import { ReviewListSkeleton } from './review-list-skeleton';
import { WriteReviewModal } from './write-review-modal';
import { useDeleteReviewMutation } from '../hooks/use-delete-review-mutation';
import { ClientErrorBoundary } from '@/components/ui/error/client-error-boundary';
import { UserReview } from '@/api/data-contracts';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

function SuspensefulWritableReviewList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      meetingQueries.joinedListQuery(JOINED_WRITABLE_PARAMS),
    );

  const writableRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const meetings = data.pages.flatMap((p) => p.data ?? []);

  if (meetings.length === 0) {
    return <EmptyReviewState message="아직 작성 가능한 리뷰가 없어요." />;
  }

  return (
    <div className="flex flex-col gap-4">
      {meetings.map((m) => (
        <DetailCard key={m.id} meeting={m} />
      ))}
      <div ref={writableRef} className="h-4" />
    </div>
  );
}

interface SuspensefulWrittenReviewListProps {
  onEditReview: (review: {
    id: number;
    score: number;
    comment: string;
  }) => void;
  onDeleteReview: (reviewId: number) => void;
}

function SuspensefulWrittenReviewList({
  onEditReview,
  onDeleteReview,
}: SuspensefulWrittenReviewListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(reviewQueries.myWrittenListQuery());

  const writtenRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  });

  const reviews = data.pages.flatMap((p) => p.data ?? []);

  if (reviews.length === 0) {
    return <EmptyReviewState message="아직 작성한 리뷰가 없어요." />;
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((r: UserReview) => (
        <WrittenReviewCard
          key={r.id}
          review={r}
          onEdit={(id, score, comment) => onEditReview({ id, score, comment })}
          onDelete={onDeleteReview}
        />
      ))}
      <div ref={writtenRef} className="h-4" />
    </div>
  );
}

export function MyReviewTabContainer() {
  const [subTab, setSubTab] = useQueryState(
    'reviewTab',
    parseAsString.withDefault('writable'),
  );

  const deleteReviewMutation = useDeleteReviewMutation();

  const [editingReview, setEditingReview] = useState<{
    id: number;
    score: number;
    comment: string;
  } | null>(null);

  const handleDelete = (reviewId: number) => {
    if (!confirm('리뷰를 삭제하시겠습니까?')) return;
    deleteReviewMutation.mutate({ reviewId });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sub Tab Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSubTab('writable')}
          className={cn(
            'px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer',
            subTab === 'writable'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          )}
        >
          작성 가능한 리뷰
        </button>
        <button
          type="button"
          onClick={() => setSubTab('written')}
          className={cn(
            'px-4 py-2 text-sm font-semibold rounded-full transition-colors cursor-pointer',
            subTab === 'written'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          )}
        >
          작성한 리뷰
        </button>
      </div>

      {/* Writable Tab Content (Suspense + ErrorBoundary) */}
      {subTab === 'writable' && (
        <ClientErrorBoundary>
          <Suspense fallback={<ReviewListSkeleton />}>
            <SuspensefulWritableReviewList />
          </Suspense>
        </ClientErrorBoundary>
      )}

      {/* Written Tab Content (Suspense + ErrorBoundary) */}
      {subTab === 'written' && (
        <ClientErrorBoundary>
          <Suspense fallback={<ReviewListSkeleton />}>
            <SuspensefulWrittenReviewList
              onEditReview={(review) => setEditingReview(review)}
              onDeleteReview={handleDelete}
            />
          </Suspense>
        </ClientErrorBoundary>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <WriteReviewModal
          key={`edit-${editingReview.id}`}
          isOpen={!!editingReview}
          review={editingReview}
          onClose={() => setEditingReview(null)}
        />
      )}
    </div>
  );
}
