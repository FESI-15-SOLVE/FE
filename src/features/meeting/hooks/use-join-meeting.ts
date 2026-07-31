import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingQueries } from '../queries/meeting-query';
import { toast } from 'sonner';
import {
  joinMeetingAction,
  leaveMeetingAction,
} from '@/actions/meeting/meeting-actions';
import { unwrapAction } from '@/lib/safe-action';

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
        (err as Error).message || '참여 처리 중 오류가 발생했습니다.',
      );
    },

    onSuccess: (_data, { meetingId, isJoined }) => {
      toast.success(
        isJoined ? '참여가 취소되었습니다.' : '참여 신청이 완료되었습니다.',
      );

      queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(String(meetingId)),
      });
    },
  });
}
