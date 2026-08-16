import { describe, it, expect } from 'vitest';
import { formatFullAddress, parseFullAddress, mapCreatePayloadToServerData } from '../meeting-mapper';
import { CreateMeetingPayload } from '../../schema/create-shcema';

describe('formatFullAddress & parseFullAddress', () => {
  it('장소주소와 상세주소를 3칸 공백 구획자로 결합해야 한다', () => {
    const full = formatFullAddress('서울 강남구 역삼동', '101호');
    expect(full).toBe('서울 강남구 역삼동   101호');
  });

  it('상세주소가 없으면 장소주소만 반환해야 한다', () => {
    expect(formatFullAddress('서울 강남구 역삼동', '')).toBe('서울 강남구 역삼동');
  });

  it('결합된 주소 문자열을 장소주소와 상세주소로 분리해야 한다', () => {
    const parsed = parseFullAddress('서울 강남구 역삼동   101호 2층');
    expect(parsed.placeAddress).toBe('서울 강남구 역삼동');
    expect(parsed.detailAddress).toBe('101호 2층');
  });

  it('null/undefined 주소 입력 시 빈 객체를 반환해야 한다', () => {
    expect(parseFullAddress(null)).toEqual({ placeAddress: '', detailAddress: '' });
  });
});

describe('mapCreatePayloadToServerData', () => {
  it('프론트엔드 CreatePayload를 서버 스펙 CreateMeeting 객체로 올바르게 변환해야 한다', () => {
    const dateTimeDate = new Date('2026-10-10');
    const registrationEndDate = new Date('2026-10-09');

    const payload: CreateMeetingPayload = {
      name: '새 모임',
      categoryId: 1,
      location: '서울',
      placeAddress: '서울 강남구 역삼동',
      detailAddress: '2층',
      latitude: 37.5,
      longitude: 127.0,
      capacity: 10,
      description: '모임 설명',
      dateTimeDate,
      dateTimeTime: { hour: 10, minute: 0 },
      registrationEndDate,
      registrationEndTime: { hour: 10, minute: 0 },
      dateTime: new Date('2026-10-10T10:00:00.000Z'),
      registrationEnd: new Date('2026-10-09T10:00:00.000Z'),
      file: new File([''], 'test.png', { type: 'image/png' }),
    };

    const serverData = mapCreatePayloadToServerData(payload, 'http://image.png');

    expect(serverData.name).toBe('새 모임');
    expect(serverData.address).toBe('서울 강남구 역삼동   2층');
    expect(serverData.capacity).toBe(10);
    expect(serverData.image).toBe('http://image.png');
    expect(serverData.dateTime).toBe('2026-10-10T10:00:00.000Z');
  });
});
