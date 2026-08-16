import { MeetingWithHost, User } from '@/api/data-contracts';

/**
 * 테스트용 User Mock 생성 팩토리 함수
 */
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: 1,
  teamId: 'fesi-15-team',
  email: 'test@example.com',
  name: '테스터',
  companyName: '코드잇',
  image: null,
  createdAt: '2026-08-17T00:00:00.000Z',
  updatedAt: '2026-08-17T00:00:00.000Z',
  ...overrides,
});

/**
 * 테스트용 MeetingWithHost Mock 생성 팩토리 함수
 */
export const createMockMeeting = (overrides?: Partial<MeetingWithHost>): MeetingWithHost => ({
  id: 101,
  teamId: 'team1',
  name: '테스트 모임',
  type: '달램핏',
  region: '서울',
  address: '서울 강남구 역삼동   101호',
  latitude: 37.5,
  longitude: 127.0,
  capacity: 5,
  participantCount: 3,
  image: null,
  description: '테스트 모임 설명',
  dateTime: '2026-12-31T18:00:00.000Z',
  registrationEnd: '2026-12-30T18:00:00.000Z',
  canceledAt: null,
  confirmedAt: null,
  createdAt: '2026-08-17T00:00:00.000Z',
  updatedAt: '2026-08-17T00:00:00.000Z',
  hostId: 10,
  createdBy: 10,
  host: {
    id: 10,
    name: '호스트',
    image: null,
  },
  isJoined: false,
  isFavorited: false,
  isCompleted: false,
  ...overrides,
});
