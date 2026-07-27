'use client';

import { useState, useRef } from 'react';
import { useKakaoLoader, Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Search, MapPin, Navigation, AlertCircle } from 'lucide-react';

export interface PlaceResultItem {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // lng
  y: string; // lat
  isCustomPin?: boolean; // 수동 클릭 핀 구분을 위한 명시적 플래그
}

export interface PlaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (placeInfo: {
    extractedRegion: string;
    placeAddress: string;
    lat: number;
    lng: number;
  }) => void;
}

// 기본 지도 중심 좌표 (N서울타워)
const DEFAULT_CENTER = { lat: 37.5511699, lng: 126.988227 };

/**
 * 카카오맵 주소(address_name)로부터 시/도 + 구/군 (예: "서울 강남구", "경기 성남시 분당구")을 추출하는 유틸리티
 */
export function extractRegion(address: string): string {
  if (!address) return '기타';
  const parts = address.trim().split(/\s+/);
  if (parts.length < 2) return address;

  const first = parts[0];
  const second = parts[1];

  if (parts.length >= 3 && second.endsWith('시') && parts[2].endsWith('구')) {
    return `${first} ${second} ${parts[2]}`;
  }

  return `${first} ${second}`;
}

export function PlaceSearchModal({
  isOpen,
  onClose,
  onSelectPlace,
}: PlaceSearchModalProps) {
  // 카카오 맵 JS SDK 로드 (하드코딩 키 제거 및 로딩/에러 수신)
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '',
    libraries: ['services'],
  });

  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<PlaceResultItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResultItem | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);
  const [searchError, setSearchError] = useState<string | null>(null);

  // 비동기 검색 Race Condition 방지를 위한 실행 ID
  const lastSearchIdRef = useRef(0);

  // 모달 닫기 시 상태 완전 초기화
  const handleClose = () => {
    setKeyword('');
    setPlaces([]);
    setSelectedPlace(null);
    setSearchError(null);
    setMapCenter(DEFAULT_CENTER);
    onClose();
  };

  // 키워드 장소 검색
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;

    if (
      typeof window === 'undefined' ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services
    ) {
      setSearchError('카카오 맵 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    const currentSearchId = ++lastSearchIdRef.current;
    setSearchError(null);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      // 최신 검색 요청이 아니면 콜백 무시 (Race condition 방지)
      if (currentSearchId !== lastSearchIdRef.current) return;

      if (status === window.kakao.maps.services.Status.OK) {
        const resultList = data as PlaceResultItem[];
        setPlaces(resultList);
        const first = resultList[0];
        setSelectedPlace(first);
        setMapCenter({ lat: parseFloat(first.y), lng: parseFloat(first.x) });
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        setSearchError('검색 결과가 존재하지 않습니다.');
      } else {
        setPlaces([]);
        setSearchError('검색 중 오류가 발생했습니다.');
      }
    });
  };

  // 지도 직접 클릭으로 핀 찍기 (역지오코딩)
  const handleMapClick = (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (
      typeof window === 'undefined' ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services
    ) {
      return;
    }

    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result[0]) {
        const addressObj = result[0];
        const roadAddress = addressObj.road_address?.address_name || '';
        const jibunAddress = addressObj.address?.address_name || '';
        const mainAddr = roadAddress || jibunAddress || '지정한 위치';
        const placeName = addressObj.road_address?.building_name || '지정한 위치';

        const customPlace: PlaceResultItem = {
          id: `pin-${Date.now()}`,
          place_name: placeName,
          road_address_name: roadAddress,
          address_name: jibunAddress || mainAddr,
          x: String(lng),
          y: String(lat),
          isCustomPin: true, // 명시적 커스텀 핀 플래그
        };

        setSelectedPlace(customPlace);
        setMapCenter({ lat, lng });
      }
    });
  };

  const handleSelectPlaceItem = (place: PlaceResultItem) => {
    setSelectedPlace(place);
    setMapCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
  };

  const handleConfirm = () => {
    if (!selectedPlace) return;

    const baseAddress = selectedPlace.address_name || selectedPlace.road_address_name;
    const extractedRegion = extractRegion(baseAddress);
    const mainAddress = selectedPlace.road_address_name || selectedPlace.address_name;
    
    // isCustomPin 여부로 안전하게 주소 포맷 판단
    const placeAddress = selectedPlace.isCustomPin || selectedPlace.place_name === '지정한 위치'
      ? mainAddress 
      : `${selectedPlace.place_name}, ${mainAddress}`;
    
    const lat = parseFloat(selectedPlace.y);
    const lng = parseFloat(selectedPlace.x);

    onSelectPlace({
      extractedRegion,
      placeAddress,
      lat,
      lng,
    });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-95 sm:max-w-220 w-full p-6 pt-7 pb-6 rounded-[24px] sm:rounded-[32px] border-none bg-white h-[640px] flex flex-col gap-5">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 shrink-0">
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-neutral-900 flex items-center gap-2">
            <Navigation className="size-6 text-brand-500" />
            카카오 맵 장소 검색
          </DialogTitle>
        </DialogHeader>

        {/* 상단 검색창 */}
        <form onSubmit={handleSearch} className="flex gap-2 shrink-0">
          <Input
            placeholder="장소명 또는 도로명 주소를 입력하세요 (예: 스타벅스 강남역점)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="md" className="px-5 shrink-0">
            <Search className="size-5" />
          </Button>
        </form>

        {/* 대형 Split View 콘텐츠 영역 (좌: 리스트, 우: 대형 지도) */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0">
          {/* 좌측 패널 (검색 결과 목록) - 가로 38% */}
          <div className="w-full sm:w-[38%] flex flex-col h-full bg-gray-50 p-3 rounded-2xl border border-neutral-200 min-h-0">
            <div className="text-xs font-semibold text-neutral-500 mb-2 px-1">
              {places.length > 0 ? `검색 결과 (${places.length}건)` : '장소 안내'}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {searchError && (
                <div className="text-sm text-neutral-500 text-center py-10">
                  {searchError}
                </div>
              )}

              {places.length === 0 && !searchError && (
                <div className="flex flex-col items-center justify-center h-full text-center text-neutral-400 p-4 space-y-2">
                  <MapPin className="size-8 text-neutral-300 animate-bounce" />
                  <p className="text-xs sm:text-sm">
                    검색어를 입력하시거나, 우측 지도에서 원하는 위치를 <strong>직접 클릭</strong>하여 핀을 찍으세요!
                  </p>
                </div>
              )}

              {places.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => handleSelectPlaceItem(place)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-white shadow-sm ring-1 ring-brand-500'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <MapPin
                        className={`size-4 mt-0.5 shrink-0 ${
                          isSelected ? 'text-brand-500' : 'text-neutral-400'
                        }`}
                      />
                      <div className="space-y-1 text-left">
                        <p className="font-semibold text-sm text-neutral-900">
                          {place.place_name}
                        </p>
                        <p className="text-xs text-neutral-600">
                          {place.road_address_name || place.address_name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 우측 대형 카카오 지도 - 가로 62% */}
          <div className="w-full sm:w-[62%] h-full rounded-2xl overflow-hidden border border-neutral-200 relative bg-neutral-100">
            {error ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-neutral-500 space-y-2">
                <AlertCircle className="size-8 text-red-400" />
                <p className="text-sm font-semibold text-neutral-700">지도를 불러오지 못했습니다.</p>
                <p className="text-xs text-neutral-400">카카오 API 키(.env.local)를 확인해 주세요.</p>
              </div>
            ) : !loading ? (
              <Map
                center={mapCenter}
                style={{ width: '100%', height: '100%' }}
                level={4}
                onClick={handleMapClick}
              >
                {/* 검색 목록 마커들 */}
                {places.map((place) => (
                  <MapMarker
                    key={place.id}
                    position={{
                      lat: parseFloat(place.y),
                      lng: parseFloat(place.x),
                    }}
                    onClick={() => handleSelectPlaceItem(place)}
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
        </div>

        {/* 선택된 위치 요약 & 하단 액션 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 pt-1 border-t border-neutral-100">
          <div className="text-xs sm:text-sm text-neutral-700 truncate w-full sm:w-auto text-left">
            {selectedPlace ? (
              <span>
                선택된 장소: <strong className="text-brand-600 font-semibold">{selectedPlace.place_name}</strong> ({selectedPlace.road_address_name || selectedPlace.address_name})
              </span>
            ) : (
              <span className="text-neutral-400">선택된 장소가 없습니다.</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Button
              type="button"
              variant="tertiary"
              size="md"
              className="flex-1 sm:w-24 rounded-xl"
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              className="flex-1 sm:w-28 rounded-xl"
              disabled={!selectedPlace}
              onClick={handleConfirm}
            >
              선택 완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
