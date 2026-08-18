import { describe, it, expect } from 'vitest';
import { formatPlaceForCallback } from '../format-place-address';
import { PlaceResultItem } from '../../types';

describe('formatPlaceForCallback 유틸리티', () => {
  it('카카오 검색 결과를 PlaceSelectInfo 객체 포맷으로 올바르게 변환한다', () => {
    const mockPlace: PlaceResultItem = {
      id: '1',
      place_name: '강남역',
      address_name: '서울 강남구 역삼동 825',
      road_address_name: '서울 강남구 강남대로 396',
      x: '127.0276',
      y: '37.4979',
    };

    const result = formatPlaceForCallback(mockPlace);
    expect(result.extractedRegion).toBe('서울 강남구');
    expect(result.placeAddress).toBe('강남역, 서울 강남구 강남대로 396');
    expect(result.lat).toBe(37.4979);
    expect(result.lng).toBe(127.0276);
  });

  it('커스텀 핀("지정한 위치")인 경우 장소명을 중복 추가하지 않고 주소만 반환한다', () => {
    const mockPlace: PlaceResultItem = {
      id: 'custom-1',
      place_name: '지정한 위치',
      address_name: '서울 서초구 반포동 1',
      road_address_name: '서울 강남구 강남대로 396',
      x: '127.0',
      y: '37.5',
      isCustomPin: true,
    };

    const result = formatPlaceForCallback(mockPlace);
    expect(result.placeAddress).toBe('서울 강남구 강남대로 396');
  });
});
