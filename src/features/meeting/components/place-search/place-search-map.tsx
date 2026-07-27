import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { KakaoMapContainer, toLatLng } from '@/features/map';
import { PlaceResultItem, LatLng } from './types';

export interface PlaceSearchMapProps {
  center: LatLng;
  places: PlaceResultItem[];
  selectedPlace: PlaceResultItem | null;
  onMapClick: (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => void;
  onSelectPlace: (place: PlaceResultItem) => void;
}

export function PlaceSearchMap({
  center,
  places,
  selectedPlace,
  onMapClick,
  onSelectPlace,
}: PlaceSearchMapProps) {
  return (
    <KakaoMapContainer
      center={center}
      onClick={onMapClick}
      className="w-full sm:w-[62%] h-full"
    >
      {/* 검색 목록 마커들 */}
      {places.map((place) => (
        <MapMarker
          key={place.id}
          position={toLatLng(place)}
          onClick={() => onSelectPlace(place)}
        />
      ))}

      {/* 현재 선택된 위치 커스텀/단일 마커 */}
      {selectedPlace && <MapMarker position={toLatLng(selectedPlace)} />}
    </KakaoMapContainer>
  );
}
