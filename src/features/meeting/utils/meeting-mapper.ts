import { CreateMeeting } from '@/api/data-contracts';
import { CreateMeetingPayload } from '../schema/create-shcema';
import { CATEGORIES_DATA } from '@/constants/categories';

export const FALLBACK_MEETING_IMAGE =
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846';

/**
 * 프론트엔드의 폼 입력 데이터(CreateMeetingPayload)를
 * 서버 생성 스펙(CreateMeeting)에 맞게 변환합니다.
 */
export function mapCreatePayloadToServerData(
  payload: CreateMeetingPayload,
  imageUrl: string | null,
): CreateMeeting {
  const category = CATEGORIES_DATA.find((c) => c.id === payload.categoryId);
  const type = category ? category.name : '기타';

  const baseAddress = payload.placeAddress || '';
  const fullAddress = payload.detailAddress
    ? baseAddress
      ? `${baseAddress}, ${payload.detailAddress}`
      : payload.detailAddress
    : baseAddress;

  return {
    name: payload.name,
    type: type,
    region: payload.location,
    address: fullAddress,
    latitude: payload.latitude,
    longitude: payload.longitude,
    dateTime: payload.dateTime?.toISOString() ?? null,
    registrationEnd: payload.registrationEnd?.toISOString() ?? null,
    capacity: payload.capacity,
    image: imageUrl,
    description: payload.description,
  };
}
