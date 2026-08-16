import { User } from '@/api/data-contracts';

/**
 * 테스트용 User Mock 생성 팩토리 함수
 * 전달받은 overrides 객체로 특정 필드만 재정의할 수 있습니다.
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
