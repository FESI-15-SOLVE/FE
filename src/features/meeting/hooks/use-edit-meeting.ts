import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditMeetingPayload,
  editMeetingSchema,
  EditMeetingValues,
} from '../schema/edit-meeting-schema';
import { MeetingWithHost, UpdateMeeting } from '@/api/data-contracts';
import { useUpdateMeeting } from './use-host-meeting-actions';
import { formatFullAddress, parseFullAddress } from '../utils/meeting-mapper';

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
      categoryId: 1,
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
    const fullAddress = formatFullAddress(
      data.placeAddress || data.location,
      data.detailAddress,
    );

    const updateData: UpdateMeeting = {
      name: data.name,
      type: data.type,
      region: data.location,
      address: fullAddress,
      latitude: data.latitude,
      longitude: data.longitude,
      capacity: Number(data.capacity),
      description: data.description,
      dateTime: data.dateTime ? data.dateTime.toISOString() : undefined,
      registrationEnd: data.registrationEnd
        ? data.registrationEnd.toISOString()
        : undefined,
      image: typeof data.file === 'string' ? data.file : undefined,
    };

    await updateMeetingAsync({
      meetingId: Number(meeting.id),
      data: updateData,
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
