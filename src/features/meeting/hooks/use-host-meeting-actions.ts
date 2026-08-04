import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cancelMeetingAction } from '@/actions/meeting/meeting-actions';
import { unwrapAction } from '@/lib/safe-action';
import { meetingQueries } from '../queries/meeting-query';
import { updateMeeting } from '../api/update-meeting';
import { EditMeetingPayload } from '../schema/edit-meeting-schema';
import { ErrorResponse } from '@/lib/error-response';

export function useUpdateMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      meetingId,
      payload,
    }: {
      meetingId: number;
      payload: EditMeetingPayload;
    }) => {
      return updateMeeting(meetingId, payload);
    },
    onSuccess: (_updatedMeeting, { meetingId }) => {
      toast.success('모임 정보가 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(meetingId),
      });
      queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '모임 수정 중 오류가 발생했습니다.',
      );
    },
  });
}

export function useCancelMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ meetingId }: { meetingId: number }) => {
      return unwrapAction(await cancelMeetingAction({ meetingId }));
    },
    onSuccess: (_cancelledMeeting, { meetingId }) => {
      toast.success('모임이 취소되었습니다.');
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(meetingId),
      });
      queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
    },
    onError: (err) => {
      toast.error(
        err instanceof ErrorResponse
          ? err.message
          : '모임 취소 중 오류가 발생했습니다.',
      );
    },
  });
}
