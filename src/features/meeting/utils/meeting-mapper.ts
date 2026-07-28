import { MeetingWithHost, JoinedMeeting, CreateMeeting } from '@/api/data-contracts';
import { CreateMeetingPayload } from '../schema/create-shcema';
import { CATEGORIES_DATA } from '@/constants/categories';
import {
  formatMeetingDate,
  formatMeetingTime,
  formatDeadlineTag,
} from './date-formatter';
import {
  getMeetingBadgeStatuses,
  getMeetingActionStatus,
  getMeetingDerivedState,
} from './meeting-status';
import { DetailCardProps } from '../components/cards/detail-card';

export const FALLBACK_MEETING_IMAGE =
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846';


/**
 * 백엔드 API 응답 (MeetingWithHost) 객체를 GroupCard 컴포넌트용 Props 포맷으로 변환하는 유틸리티 함수
 */
export function mapMeetingToGroupCard(meeting: MeetingWithHost) {
  // 리스트 조회 시 방장 여부는 굳이 중요하지 않을 수 있으나 일관성을 위해 상태 유틸을 사용합니다.
  const state = getMeetingDerivedState(meeting);
  
  return {
    id: String(meeting.id),
    title: meeting.name,
    imageUrl: meeting.image ?? FALLBACK_MEETING_IMAGE,
    location: meeting.region,
    category: meeting.type,
    date: formatMeetingDate(meeting.dateTime),
    time: formatMeetingTime(meeting.dateTime),
    deadlineTag: formatDeadlineTag(meeting.registrationEnd),
    participantCount: state.participantCount,
    maxParticipant: state.capacity,
    isFavorited: state.isSaved,
    isJoined: state.isJoined,
    isCanceled: state.isCanceled,
    isFull: state.isFull,
    isRegistrationClosed: state.isRegistrationClosed,
  };
}

/**
 * 백엔드 API 응답 (MeetingWithHost / JoinedMeeting) 객체를 DetailCard 컴포넌트용 Props 포맷으로 변환하는 유틸리티 함수
 */
export function mapMeetingToDetailCard(
  meeting: JoinedMeeting | MeetingWithHost,
): DetailCardProps {
  // JoinedMeeting은 MeetingWithHost의 하위집합이지만 필요한 필드가 다 있다면 타입캐스팅 가능
  const state = getMeetingDerivedState(meeting as MeetingWithHost);
  
  return {
    meeting: {
      id: String(meeting.id),
      title: meeting.name,
      imageUrl: meeting.image ?? FALLBACK_MEETING_IMAGE,
      location: meeting.address || meeting.region,
      date: formatMeetingDate(meeting.dateTime),
      time: formatMeetingTime(meeting.dateTime),
      participantCount: state.participantCount,
      maxParticipant: state.capacity,
      isSaved: state.isSaved,
    },
    badgeStatuses: getMeetingBadgeStatuses(meeting),
    actionStatus: getMeetingActionStatus(meeting),
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
