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

  const meetingDateObj = meeting.dateTime ? new Date(meeting.dateTime) : undefined;
  const regEndObj = meeting.registrationEnd ? new Date(meeting.registrationEnd) : undefined;

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
      dateTimeDate: meetingDateObj,
      dateTimeTime: meetingDateObj
        ? { hour: meetingDateObj.getHours(), minute: meetingDateObj.getMinutes() }
        : undefined,
      registrationEndDate: regEndObj,
      registrationEndTime: regEndObj
        ? { hour: regEndObj.getHours(), minute: regEndObj.getMinutes() }
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
