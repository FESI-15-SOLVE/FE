import { MeetingWithHost, CreateMeeting } from '@/api/data-contracts';
import { CreateMeetingPayload } from '../schema/create-shcema';
import { CATEGORIES_DATA } from '@/constants/categories';

/**
 * 백엔드 API 응답 (MeetingWithHost) 객체를 GroupCard 컴포넌트용 Props 포맷으로 변환하는 유틸리티 함수
 */
export function mapMeetingToGroupCard(meeting: MeetingWithHost) {
  return {
    id: String(meeting.id),
    title: meeting.name,
    imageUrl:
      meeting.image ??
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846',
    location: meeting.region,
    category: meeting.type,
    date: meeting.dateTime
      ? new Date(meeting.dateTime).toLocaleDateString('ko-KR')
      : '날짜 미정',
    time: meeting.dateTime
      ? new Date(meeting.dateTime).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '시간 미정',
    deadlineTag: '마감 임박',
    participantCount: meeting.participantCount,
    maxParticipant: meeting.capacity,
    isFavorited: Boolean(meeting.isFavorited),
    isJoined: Boolean(meeting.isJoined),
  };
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

  const baseAddress = payload.placeAddress || '';
  const fullAddress = payload.detailAddress
    ? (baseAddress ? `${baseAddress}, ${payload.detailAddress}` : payload.detailAddress)
    : baseAddress;

  return {
    name: payload.name,
    type: type,
    region: payload.location, // 카카오 주소에서 추출된 시/도 + 구/군 (예: "서울 강남구")
    address: fullAddress, // 장소명 + 도로명주소 + 수동 상세주소 (예: "스타벅스 강남역점, 서울 강남구 강남대로 390, 3층 301호")
    latitude: payload.latitude,
    longitude: payload.longitude,
    dateTime: payload.dateTime?.toISOString() ?? null,
    registrationEnd: payload.registrationEnd?.toISOString() ?? null,
    capacity: payload.capacity,
    image: imageUrl,
    description: payload.description,
  };
}
