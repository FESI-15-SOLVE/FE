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
      meetingId: number;
      isJoined: boolean;
    }) => {
      if (isJoined) {
        unwrapAction(
          await leaveMeetingAction({ meetingId }),
        );
      } else {
        unwrapAction(await joinMeetingAction({ meetingId }));
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

      const detailKey = meetingQueries.detailKey(meetingId);
      const listKeys = meetingQueries.listKeys();
      const joinedListKeys = meetingQueries.joinedListKeys();
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
              const item = page.data?.find((i) => i.id === meetingId);
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

      // 2. 나의 모임 목록(joinedListKeys)에서 참여 취소 시 해당 카드만 즉시 제거
      if (isJoined) {
        queryClient.setQueriesData<{ pages?: MeetingList[] }>(
          { queryKey: joinedListKeys },
          (old) =>
            produce(old, (draft) => {
              draft?.pages?.forEach((page) => {
                if (page.data) {
                  page.data = page.data.filter((item) => item.id !== meetingId);
                }
              });
            }),
        );
      }

      // 3. 상세 페이지만 invalidate (정원 마감 등 정확성이 중요한 데이터)
      queryClient.invalidateQueries({ queryKey: detailKey });
      queryClient.invalidateQueries({
        queryKey: meetingQueries.participantKey(meetingId),
      });
    },
  });
}
