import { createMeetingAction } from '@/actions/meeting/meeting-actions';
import { uploadImage } from '@/lib/upload-image';
import { mapCreatePayloadToServerData } from '../utils/meeting-mapper';
import { CreateMeetingPayload } from '../schema/create-shcema';
import { unwrapAction } from '@/lib/safe-action';

export async function createMeeting(
  payload: CreateMeetingPayload
) {
  let imageUrl: string | null = null;

  // 1. 이미지가 있다면 먼저 S3에 다이렉트 업로드
  if (payload.file) {
    imageUrl = await uploadImage(payload.file, 'meetings');
  }

  // 2. 폼 데이터를 백엔드 API 스펙(CreateMeeting)으로 매핑
  const mappedData = mapCreatePayloadToServerData(payload, imageUrl);

  // 3. 매핑된 JSON 데이터를 서버 액션으로 전송 후 unwrap하여 최종 생성 데이터 반환
  return unwrapAction(await createMeetingAction(mappedData));
}
