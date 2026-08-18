import { describe, it, expect } from 'vitest';
import { extractRegion } from '../extract-region';

describe('extractRegion 유틸리티', () => {
  it('주소가 없거나 빈 문자열인 경우 "기타"를 반환한다', () => {
    expect(extractRegion('')).toBe('기타');
  });

  it('단어가 1개인 주소는 원본을 그대로 반환한다', () => {
    expect(extractRegion('서울')).toBe('서울');
  });

  it('일반적인 2단어 이상의 주소에서 앞 2단어(시/도 + 구/군)를 추출한다', () => {
    expect(extractRegion('서울 강남구 역삼동')).toBe('서울 강남구');
  });

  it('두 번째 단어가 "시"로 끝나고 세 번째 단어가 "구"로 끝나는 경우 3단어를 추출한다', () => {
    expect(extractRegion('경기 성남시 분당구 백현동 123')).toBe('경기 성남시 분당구');
  });
});
