import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditMeetingPayload,
  editMeetingSchema,
  EditMeetingValues,
} from '../schema/edit-meeting-schema';
import { MeetingWithHost } from '@/api/data-contracts';
import { useUpdateMeeting } from './use-host-meeting-actions';
import { parseFullAddress } from '../utils/meeting-mapper';

interface UseEditMeetingProps {
  meeting: MeetingWithHost;
  onSubmitSuccess?: () => void;
}

export function useEditMeeting({
  meeting,
  onSubmitSuccess,
}: UseEditMeetingProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'schedule'>('basic');

  const { placeAddress: parsedPlace, detailAddress: parsedDetail } =
    parseFullAddress(meeting.address);

  const methods = useForm<EditMeetingValues, unknown, EditMeetingPayload>({
    resolver: zodResolver(editMeetingSchema),
    defaultValues: {
      type: meeting.type || '기타',
      name: meeting.name || '',
      location: meeting.region || '',
      placeAddress: parsedPlace || meeting.address || '',
      detailAddress: parsedDetail || '',
      latitude: meeting.latitude ?? undefined,
      longitude: meeting.longitude ?? undefined,
      file: meeting.image || null,
      dateTime: meeting.dateTime ? new Date(meeting.dateTime) : undefined,
      registrationEnd: meeting.registrationEnd
        ? new Date(meeting.registrationEnd)
        : undefined,
      capacity: meeting.capacity || 10,
      description: meeting.description || '',
    },
    mode: 'onChange',
  });

  const { handleSubmit } = methods;
  const { mutateAsync: updateMeetingAsync, isPending: isSubmitting } =
    useUpdateMeeting();

  const submitForm = handleSubmit(async (data) => {
    await updateMeetingAsync({
      meetingId: Number(meeting.id),
      payload: data,
    });

    onSubmitSuccess?.();
  });

  return {
    methods,
    activeTab,
    setActiveTab,
    isSubmitting,
    submitForm,
  };
}
