import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMeeting } from '../api/create-meeting';
import { meetingQueries } from '../queries/meeting-query';
import { CreateMeetingPayload } from '../schema/create-shcema';

export function useCreateMeetingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMeetingPayload) => createMeeting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingQueries.listKeys(),
      });
    },
  });
}
