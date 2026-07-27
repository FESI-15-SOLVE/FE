'use client';

import { useState } from 'react';
import { useKakaoLoader, Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Search, MapPin } from 'lucide-react';

export interface PlaceResultItem {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // lng
  y: string; // lat
}

export interface PlaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (placeInfo: {
    formattedAddress: string;
    lat: number;
    lng: number;
  }) => void;
}

export function PlaceSearchModal({
  isOpen,
  onClose,
  onSelectPlace,
}: PlaceSearchModalProps) {
  // 카카오 맵 JS SDK 로드 (services 라이브러리 포함)
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '99fbfa9e7b235e2ebfef39c81122a27d', // 환경변수 fallback
    libraries: ['services'],
  });

  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<PlaceResultItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResultItem | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;

    if (typeof window === 'undefined' || !window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      setSearchError('카카오 맵 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    setSearchError(null);
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data as PlaceResultItem[]);
        setSelectedPlace(data[0] as PlaceResultItem); // 첫 번째 결과 기본 선택
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        setSelectedPlace(null);
        setSearchError('검색 결과가 존재하지 않습니다.');
      } else {
        setPlaces([]);
        setSelectedPlace(null);
        setSearchError('검색 중 오류가 발생했습니다.');
      }
    });
  };

  const handleConfirm = () => {
    if (!selectedPlace) return;

    const mainAddress = selectedPlace.road_address_name || selectedPlace.address_name;
    const formattedAddress = `${selectedPlace.place_name}, ${mainAddress}`;
    const lat = parseFloat(selectedPlace.y);
    const lng = parseFloat(selectedPlace.x);

    onSelectPlace({
      formattedAddress,
      lat,
      lng,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-85.75 sm:max-w-160 p-6 pt-8 pb-6 sm:p-10 rounded-[24px] sm:rounded-[32px] gap-6 border-none bg-white max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-neutral-900">
            카카오 맵 장소 검색
          </DialogTitle>
        </DialogHeader>

        {/* 검색창 */}
        <form onSubmit={handleSearch} className="flex gap-2">
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

        {/* 메인 콘텐츠 영역 (검색 결과 리스트 + 지도) */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0 overflow-hidden">
          {/* 장소 리스트 */}
          <div className="flex-1 overflow-y-auto max-h-60 sm:max-h-80 space-y-2 pr-1">
            {searchError && (
              <div className="text-sm text-neutral-500 text-center py-8">
                {searchError}
              </div>
            )}

            {places.map((place) => {
              const isSelected = selectedPlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className={`size-4 mt-0.5 shrink-0 ${isSelected ? 'text-brand-500' : 'text-neutral-400'}`} />
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

          {/* 카카오 지도 미리보기 */}
          <div className="w-full sm:w-64 h-48 sm:h-auto rounded-2xl overflow-hidden border border-neutral-200 shrink-0 relative bg-neutral-100">
            {!loading && selectedPlace ? (
              <Map
                center={{ lat: parseFloat(selectedPlace.y), lng: parseFloat(selectedPlace.x) }}
                style={{ width: '100%', height: '100%' }}
                level={3}
              >
                <MapMarker
                  position={{ lat: parseFloat(selectedPlace.y), lng: parseFloat(selectedPlace.x) }}
                />
              </Map>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                {loading ? '지도를 불러오는 중...' : '장소를 선택해주세요'}
              </div>
            )}
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="flex items-center gap-3 w-full pt-2">
          <Button
            type="button"
            variant="tertiary"
            size="md"
            className="flex-1 rounded-xl"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1 rounded-xl"
            disabled={!selectedPlace}
            onClick={handleConfirm}
          >
            선택 완료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
