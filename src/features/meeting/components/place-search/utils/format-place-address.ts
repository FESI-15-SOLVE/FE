import { PlaceResultItem, PlaceSelectInfo } from '../types';
import { extractRegion } from './extract-region';

/**
 * 선택된 PlaceResultItem을 상위 컴포넌트(onSelectPlace 콜백)에 넘겨줄 PlaceSelectInfo 포맷으로 변환하는 유틸리티
 */
export function formatPlaceForCallback(place: PlaceResultItem): PlaceSelectInfo {
  const baseAddress = place.address_name || place.road_address_name;
  const extractedRegion = extractRegion(baseAddress);
  const mainAddress = place.road_address_name || place.address_name;

  const isCustomPin = place.isCustomPin || place.place_name === '지정한 위치';
  const placeAddress = isCustomPin
    ? mainAddress
    : `${place.place_name}, ${mainAddress}`;

  return {
    extractedRegion,
    placeAddress,
    lat: parseFloat(place.y),
    lng: parseFloat(place.x),
  };
}
