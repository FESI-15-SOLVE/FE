export interface RawCoordinate {
  x: string | number; // lng
  y: string | number; // lat
}

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * 카카오 맵 API 응답의 x(lng), y(lat) 객체나 숫자를 { lat, lng } 표준 LatLng 객체로 변환하는 유틸리티
 */
export function toLatLng(coord: RawCoordinate): LatLng {
  const lat = typeof coord.y === 'number' ? coord.y : parseFloat(coord.y);
  const lng = typeof coord.x === 'number' ? coord.x : parseFloat(coord.x);

  return {
    lat: Number.isNaN(lat) ? 0 : lat,
    lng: Number.isNaN(lng) ? 0 : lng,
  };
}
