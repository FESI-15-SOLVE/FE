import { MeetingWithHost } from '@/api/data-contracts';

/**
 * 백엔드 API 응답 (MeetingWithHost) 객체를 GroupCard 컴포넌트용 Props 포맷으로 변환하는 유틸리티 함수
 * 비로그인 시 isFavorited와 isJoined는 undefined로 내려오므로 Boolean() 처리를 통해 기본값(false)으로 안전하게 매핑됩니다.
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
    isSaved: Boolean(meeting.isFavorited),
    isJoined: Boolean(meeting.isJoined),
  };
}
