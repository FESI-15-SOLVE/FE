import { describe, it, expect } from 'vitest';
import { toLatLng } from '../to-lat-lng';

describe('toLatLng 유틸리티', () => {
  it('문자열 형식의 x, y 좌표를 LatLng 숫자 객체로 변환한다', () => {
    const result = toLatLng({ x: '127.123', y: '37.456' });
    expect(result).toEqual({ lat: 37.456, lng: 127.123 });
  });

  it('이미 숫자형인 좌표 객체를 그대로 유지한다', () => {
    const result = toLatLng({ x: 127.123, y: 37.456 });
    expect(result).toEqual({ lat: 37.456, lng: 127.123 });
  });

  it('유효하지 않은 NaN 좌표 입력 시 기본값 0을 세팅한다', () => {
    const result = toLatLng({ x: 'invalid', y: 'invalid' });
    expect(result).toEqual({ lat: 0, lng: 0 });
  });
});
