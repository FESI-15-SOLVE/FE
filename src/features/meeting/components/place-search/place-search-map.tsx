import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { AlertCircle } from 'lucide-react';
import { PlaceResultItem, LatLng } from './types';

export interface PlaceSearchMapProps {
  loading: boolean;
  error: Error | undefined;
  center: LatLng;
  places: PlaceResultItem[];
  selectedPlace: PlaceResultItem | null;
  onMapClick: (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => void;
  onSelectPlace: (place: PlaceResultItem) => void;
}

export function PlaceSearchMap({
  loading,
  error,
  center,
  places,
  selectedPlace,
  onMapClick,
  onSelectPlace,
}: PlaceSearchMapProps) {
  return (
    <div className="w-full sm:w-[62%] h-full rounded-2xl overflow-hidden border border-neutral-200 relative bg-neutral-100">
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-neutral-500 space-y-2">
          <AlertCircle className="size-8 text-red-400" />
          <p className="text-sm font-semibold text-neutral-700">
            지도를 불러오지 못했습니다.
          </p>
          <p className="text-xs text-neutral-400">
            카카오 API 키(.env.local)를 확인해 주세요.
          </p>
        </div>
      ) : !loading ? (
        <Map
          center={center}
          style={{ width: '100%', height: '100%' }}
          level={4}
          onClick={onMapClick}
        >
          {/* 검색 목록 마커들 */}
          {places.map((place) => (
            <MapMarker
              key={place.id}
              position={{
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              }}
              onClick={() => onSelectPlace(place)}
            />
          ))}

          {/* 현재 선택된 위치 커스텀/단일 마커 */}
          {selectedPlace && (
            <MapMarker
              position={{
                lat: parseFloat(selectedPlace.y),
                lng: parseFloat(selectedPlace.x),
              }}
            />
          )}
        </Map>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
          카카오 지도를 로딩 중입니다...
        </div>
      )}
    </div>
  );
}
