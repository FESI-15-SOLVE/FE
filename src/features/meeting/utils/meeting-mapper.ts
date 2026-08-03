import { CreateMeeting, UpdateMeeting } from '@/api/data-contracts';
import { CreateMeetingPayload } from '../schema/create-shcema';
import { EditMeetingPayload } from '../schema/edit-meeting-schema';
import { CATEGORIES_DATA } from '@/constants/categories';

export const FALLBACK_MEETING_IMAGE =
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846';

export const ADDRESS_DELIMITER = '   '; // 공백 3칸 (HTML 자동 1칸 렌더링 + 역파싱 구분자)

/**
 * 장소주소(placeAddress)와 수동 입력 상세주소(detailAddress)를 결합합니다.
 */
export function formatFullAddress(
  placeAddress?: string,
  detailAddress?: string,
): string {
  const cleanPlace = (placeAddress || '').trim();
  const cleanDetail = (detailAddress || '').trim();

  if (!cleanDetail) return cleanPlace;
  if (!cleanPlace) return cleanDetail;
  return `${cleanPlace}${ADDRESS_DELIMITER}${cleanDetail}`;
}

/**
 * 결합된 주소 문자열(rawAddress)을 장소주소(placeAddress)와 상세주소(detailAddress)로 분리합니다.
 */
export function parseFullAddress(rawAddress?: string | null): {
  placeAddress: string;
  detailAddress: string;
} {
  if (!rawAddress) return { placeAddress: '', detailAddress: '' };
  const parts = rawAddress.split(/\s{3,}/); // 3칸 이상 공백 기준 분리
  const placeAddress = parts[0] || '';
  const detailAddress = parts.slice(1).join(' ') || '';

  return { placeAddress, detailAddress };
}

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

  const fullAddress = formatFullAddress(payload.placeAddress, payload.detailAddress);

  return {
    name: payload.name,
    type,
    region: payload.location,
    address: fullAddress,
    latitude: payload.latitude,
    longitude: payload.longitude,
    capacity: Number(payload.capacity),
    description: payload.description,
    dateTime: payload.dateTime ? payload.dateTime.toISOString() : null,
    registrationEnd: payload.registrationEnd
      ? payload.registrationEnd.toISOString()
      : null,
    image: imageUrl,
  };
}

/**
 * 프론트엔드의 폼 입력 데이터(EditMeetingPayload)를
 * 서버 수정 스펙(UpdateMeeting)에 맞게 변환합니다.
 */
export function mapUpdatePayloadToServerData(
  payload: EditMeetingPayload,
  imageUrl?: string | null,
): UpdateMeeting {
  const fullAddress = formatFullAddress(
    payload.placeAddress || payload.location,
    payload.detailAddress,
  );

  return {
    name: payload.name,
    type: payload.type,
    region: payload.location,
    address: fullAddress,
    latitude: payload.latitude,
    longitude: payload.longitude,
    capacity: Number(payload.capacity),
    description: payload.description,
    dateTime: payload.dateTime ? payload.dateTime.toISOString() : undefined,
    registrationEnd: payload.registrationEnd
      ? payload.registrationEnd.toISOString()
      : undefined,
    image: imageUrl,
  };
}
