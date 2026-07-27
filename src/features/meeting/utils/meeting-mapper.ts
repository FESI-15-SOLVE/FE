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

  return {
    name: payload.name,
    type: type,
    region: payload.location, // 현재 폼의 location 필드를 임시로 region에 매핑
    address: payload.detailAddress,
    dateTime: payload.dateTime?.toISOString() ?? null,
    registrationEnd: payload.registrationEnd?.toISOString() ?? null,
    capacity: payload.capacity,
    image: imageUrl,
    description: payload.description,
  };
}
