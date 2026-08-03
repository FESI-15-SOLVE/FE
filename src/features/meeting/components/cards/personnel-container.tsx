'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StatusLabel } from '@/components/ui/label/status-label';
import { ProgressBar } from '@/components/ui/progress/progress-bar';
import { useQuery } from '@tanstack/react-query';
import { meetingQueries } from '../../queries/meeting-query';

export interface PersonnelContainerProps {
  meetingId: string;
  currentParticipant: number;
  minParticipant: number;
  maxParticipant: number;
  isConfirmed?: boolean;
  className?: string;
}

export function PersonnelContainer({
  meetingId,
  currentParticipant,
  minParticipant,
  maxParticipant,
  isConfirmed = false,
  className,
}: PersonnelContainerProps) {
  const { data: participantsData } = useQuery(
    meetingQueries.participantsQuery(meetingId),
  );

  const participantImages =
    participantsData?.data
      ?.map((p) => p.user?.image)
      .filter((img): img is string => Boolean(img)) || [];

  const displayAvatars = participantImages.slice(0, 4);
  const remainingCount = currentParticipant > 4 ? currentParticipant - 4 : 0;

  return (
    <div
      className={cn(
        'relative flex flex-col items-start border border-green-200 bg-linear-to-r from-green-50 to-cyan-50',
        'w-full rounded-2xl px-6 py-5',
        'md:rounded-3xl md:px-10 md:py-8',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col items-start shrink-0 w-full gap-3 md:gap-4',
        )}
      >
        {/* 상단: 참여 인원, 아바타, 개설확정 뱃지 */}
        <div className="flex items-start justify-between w-full shrink-0">
          <div className="flex items-center gap-3 shrink-0">
            {/* 텍스트 영역 */}
            <div
              className={cn(
                'flex items-start whitespace-nowrap',
                'text-sm leading-5',
                'md:text-lg md:leading-7 md:tracking-[-0.36px]',
              )}
            >
              <span
                className={cn(
                  'text-green-600',
                  'font-semibold tracking-[-0.42px]',
                  'md:font-bold md:tracking-normal',
                )}
              >
                {currentParticipant}
              </span>
              <span
                className={cn(
                  'font-medium text-gray-900',
                  'tracking-[-0.28px] md:tracking-normal',
                )}
              >
                명 참여
              </span>
            </div>

            {/* 아바타 영역 */}
            <div className="flex items-start shrink-0">
              {displayAvatars.map((src, idx) => (
                <div
                  key={idx}
                  className="relative size-7 -mr-2 shrink-0 rounded-full overflow-hidden border border-white"
                >
                  <Image
                    src={src}
                    alt="Participant"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="relative flex items-center justify-center size-7 -mr-2 shrink-0 rounded-full bg-slate-200 border border-white z-10">
                  <span className="font-semibold text-slate-700 text-xs leading-4">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 개설확정 뱃지 */}
          <div className="flex items-center shrink-0 h-7">
            {isConfirmed && (
              <>
                <div className="md:hidden">
                  <StatusLabel size="sm" label="개설확정" />
                </div>
                <div className="hidden md:block">
                  <StatusLabel size="lg" label="개설확정" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 하단: 프로그레스 바 영역 */}
        <div className="flex flex-col items-start w-full gap-2 shrink-0">
          {/* 최소 / 최대 라벨 */}
          <div
            className={cn(
              'flex items-center justify-between w-full font-medium text-slate-600 whitespace-nowrap',
              'text-xs leading-4',
              'md:text-sm md:leading-5 md:tracking-[-0.28px]',
            )}
          >
            <span>최소 {minParticipant}명</span>
            <span>최대 {maxParticipant}명</span>
          </div>

          <ProgressBar
            total={maxParticipant}
            current={currentParticipant}
            showCounter={false}
            showIcon={false}
          />
        </div>
      </div>
    </div>
  );
}
