import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMeetingAction } from '@/actions/meeting/meeting-actions';
import { unwrapAction } from '@/lib/safe-action';
import { meetingQueries } from '../queries/meeting-query';
import { notificationQueries } from '@/features/notification/queries/notification-query';
import { updateMeeting } from '../api/update-meeting';
import { EditMeetingPayload } from '../schema/edit-meeting-schema';

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

    meta: {
      toastMessage: '모임 정보가 수정되었습니다.',
      errorMessage: '모임 수정 중 오류가 발생했습니다.',
    },

    onSuccess: (_updatedMeeting, { meetingId }) => {
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(meetingId),
      });
      queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
    },
  });
}

export function useCancelMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ meetingId }: { meetingId: number }) => {
      return unwrapAction(await cancelMeetingAction({ meetingId }));
    },

    meta: {
      toastMessage: '모임이 취소되었습니다.',
      errorMessage: '모임 취소 중 오류가 발생했습니다.',
    },

    onSuccess: (_cancelledMeeting, { meetingId }) => {
      queryClient.invalidateQueries({
        queryKey: meetingQueries.detailKey(meetingId),
      });
      queryClient.invalidateQueries({ queryKey: meetingQueries.listKeys() });
      // 모임 취소 시 백엔드 MEETING_CANCELED 알림 생성되므로 알림 쿼리 즉시 트리거
      queryClient.invalidateQueries({
        queryKey: notificationQueries.unreadCountKey(),
      });
    },
  });
}
