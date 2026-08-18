import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMeeting } from '../api/create-meeting';
import { meetingQueries } from '../queries/meeting-query';
import { CreateMeetingPayload } from '../schema/create-shcema';

export function useCreateMeetingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMeetingPayload) => createMeeting(payload),
    meta: {
      toastMessage: '모임이 생성되었습니다.',
      errorMessage: '모임 생성 중 오류가 발생했습니다.',
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingQueries.listKeys(),
      });
    },
  });
}
