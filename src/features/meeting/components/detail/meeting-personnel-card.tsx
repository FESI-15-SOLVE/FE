'use client';

import { useState } from 'react';
import { Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeetingWithHost } from '@/api/data-contracts';
import { toast } from 'sonner';

export interface MeetingPersonnelCardProps {
  meeting: MeetingWithHost;
  onJoinToggle?: () => void;
}

export function MeetingPersonnelCard({
  meeting,
  onJoinToggle,
}: MeetingPersonnelCardProps) {
  const [isPending, setIsPending] = useState(false);

  const capacity = meeting.capacity || 1;
  const participantCount = meeting.participantCount || 0;
  const isJoined = Boolean(meeting.isJoined);
  const isCanceled = !meeting.canceledAt;
  const isFull = participantCount >= capacity;

  // 정원 채움 비율 (0 ~ 100%)
  const percentage = Math.min(
    Math.round((participantCount / capacity) * 100),
    100,
  );

  const handleAction = async () => {
    setIsPending(true);
    try {
      if (onJoinToggle) {
        onJoinToggle();
      } else {
        toast.info(
          isJoined ? '참여가 취소되었습니다.' : '참여 신청이 완료되었습니다.',
        );
      }
    } catch {
      toast.error('처리 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-neutral-900 text-base sm:text-lg">
          <Users className="size-5 text-brand-500" />
          <span>모집 현황</span>
        </div>
        <div className="text-sm font-semibold text-neutral-700">
          <span className="text-brand-600 font-bold">{participantCount}</span> /{' '}
          {capacity}명
        </div>
      </div>

      {/* 모집 달성률 Progress 바 */}
      <div className="space-y-1.5">
        <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          <span>달성률 {percentage}%</span>
          {isFull && (
            <span className="text-amber-600 font-semibold">정원 마감</span>
          )}
        </div>
      </div>

      {/* 참가자 목록 아바타 서클 (최대 5명 노출) */}
      <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
        <div className="flex -space-x-2 overflow-hidden">
          {Array.from({ length: Math.min(participantCount, 5) }).map(
            (_, idx) => (
              <div
                key={idx}
                className="inline-block size-8 rounded-full ring-2 ring-white bg-neutral-200 relative overflow-hidden shrink-0"
              >
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <User className="size-4" />
                </div>
              </div>
            ),
          )}
        </div>
        {participantCount > 5 && (
          <span className="text-xs text-neutral-500 font-medium">
            외 {participantCount - 5}명 참여 중
          </span>
        )}
      </div>

      {/* 하단 참여 액션 버튼 */}
      <div className="pt-2">
        {isCanceled ? (
          <Button
            disabled
            variant="tertiary"
            className="w-full py-6 text-base font-semibold rounded-2xl"
          >
            취소된 모임입니다
          </Button>
        ) : isJoined ? (
          <Button
            variant="tertiary"
            disabled={isPending}
            onClick={handleAction}
            className="w-full py-6 text-base font-semibold rounded-2xl text-neutral-700 hover:bg-neutral-100"
          >
            참여 취소하기
          </Button>
        ) : isFull ? (
          <Button
            disabled
            variant="tertiary"
            className="w-full py-6 text-base font-semibold rounded-2xl"
          >
            모집이 마감되었습니다
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={isPending}
            onClick={handleAction}
            className="w-full py-6 text-base font-semibold rounded-2xl"
          >
            참여하기
          </Button>
        )}
      </div>
    </div>
  );
}
