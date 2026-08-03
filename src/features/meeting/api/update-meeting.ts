import { updateMeetingAction } from '@/actions/meeting/meeting-actions';
import { uploadImage } from '@/lib/upload-image';
import { mapUpdatePayloadToServerData } from '../utils/meeting-mapper';
import { EditMeetingPayload } from '../schema/edit-meeting-schema';
import { unwrapAction } from '@/lib/safe-action';

export async function updateMeeting(
  meetingId: number,
  payload: EditMeetingPayload,
) {
  let imageUrl: string | null | undefined = undefined;

  // 1. 이미지 처리 (새 File인 경우 S3 업로드, string인 경우 기존 URL 유지, null인 경우 삭제)
  if (payload.file instanceof File) {
    imageUrl = await uploadImage(payload.file, 'meetings');
  } else if (typeof payload.file === 'string') {
    imageUrl = payload.file;
  } else if (payload.file === null) {
    imageUrl = null;
  }

  // 2. 폼 데이터를 백엔드 API 스펙(UpdateMeeting)으로 매핑
  const updateData = mapUpdatePayloadToServerData(payload, imageUrl);

  // 3. Server Action 호출 및 결과 반환
  return unwrapAction(
    await updateMeetingAction({
      meetingId,
      data: updateData,
    }),
  );
}
