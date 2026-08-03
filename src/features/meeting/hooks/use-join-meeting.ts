import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { meetingQueries } from '../queries/meeting-query';
import { MeetingWithHost, MeetingList } from '@/api/data-contracts';
import { toast } from 'sonner';
import {
  joinMeetingAction,
  leaveMeetingAction,
} from '@/actions/meeting/meeting-actions';
import { unwrapAction } from '@/lib/safe-action';
import { ErrorResponse } from '@/lib/error-response';

export function useJoinMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      meetingId,
      isJoined,
    }: {
      meetingId: string | number;
      isJoined: boolean;
    }) => {
      if (isJoined) {
        unwrapAction(
          await leaveMeetingAction({ meetingId: Number(meetingId) }),
        );
      } else {
        unwrapAction(await joinMeetingAction({ meetingId: Number(meetingId) }));
      }
    },

    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '참여 처리 중 오류가 발생했습니다.',
      );
    },

    onSuccess: (_data, { meetingId, isJoined }) => {
      toast.success(
        isJoined ? '참여가 취소되었습니다.' : '참여 신청이 완료되었습니다.',
      );

      const detailKey = meetingQueries.detailKey(String(meetingId));
      const listKeys = meetingQueries.listKeys();
      const countDiff = isJoined ? -1 : 1;

      // 1. 서버 확인 후 캐시 즉시 패치 → 버튼 상태 번쩍임 없이 즉시 반영
      queryClient.setQueryData<MeetingWithHost>(
        detailKey,
        (old) =>
          old &&
          produce(old, (draft) => {
            draft.isJoined = !isJoined;
            draft.participantCount = Math.max(
              0,
              (draft.participantCount || 0) + countDiff,
            );
          }),
      );

      queryClient.setQueriesData<{ pages?: MeetingList[] }>(
        { queryKey: listKeys },
        (old) =>
          produce(old, (draft) => {
            draft?.pages?.forEach((page) => {
              const item = page.data?.find(
                (i) => String(i.id) === String(meetingId),
              );
              if (item) {
                item.isJoined = !isJoined;
                item.participantCount = Math.max(
                  0,
                  (item.participantCount || 0) + countDiff,
                );
              }
            });
          }),
      );

      // 2. 상세 페이지만 invalidate (정원 마감 등 정확성이 중요한 데이터)
      //    목록은 patch만 신뢰: 무한스크롤 전체 재요청은 UX 파괴 대비 실익 없음
      //    (participantCount가 다른 사용자의 동시 액션으로 살짝 어긋날 수 있으나 목록에서는 허용)
      queryClient.invalidateQueries({ queryKey: detailKey });
      // 참여자 아이콘 목록도 갱신 (PersonnelContainer의 아바타 리스트)
      queryClient.invalidateQueries({
        queryKey: meetingQueries.participantKey(String(meetingId)),
      });
    },
  });
}
