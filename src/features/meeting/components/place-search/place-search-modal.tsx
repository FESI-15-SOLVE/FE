'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Navigation } from 'lucide-react';
import { PlaceSearchModalProps, LatLng } from './types';
import { formatPlaceForCallback } from './utils/format-place-address';
import { useKakaoPlaceSearch } from './hooks/use-kakao-place-search';
import { useReverseGeocode } from './hooks/use-reverse-geocode';
import { usePlaceSelection } from './hooks/use-place-selection';
import { PlaceSearchForm } from './place-search-form';
import { PlaceResultList } from './place-result-list';
import { PlaceSearchMap } from './place-search-map';
import { SelectedPlaceFooter } from './selected-place-footer';

// 기본 지도 중심 좌표 (N서울타워)
const DEFAULT_CENTER: LatLng = { lat: 37.5511699, lng: 126.988227 };

export function PlaceSearchModal({
  isOpen,
  onClose,
  onSelectPlace,
}: PlaceSearchModalProps) {
  const search = useKakaoPlaceSearch();
  const selection = usePlaceSelection(DEFAULT_CENTER);
  const { reverseGeocode } = useReverseGeocode();

  // 모달 닫기 시 상태 완전 리셋
  const handleClose = () => {
    search.reset();
    selection.reset();
    onClose();
  };

  // 지도 클릭 핸들러 (역지오코딩)
  const handleMapClick = (
    _map: kakao.maps.Map,
    e: kakao.maps.event.MouseEvent,
  ) => {
    const lat = e.latLng.getLat();
    const lng = e.latLng.getLng();
    reverseGeocode(lng, lat, selection.selectPlace);
  };

  // 선택 완료 핸들러
  const handleConfirm = () => {
    if (!selection.selectedPlace) return;
    const formatted = formatPlaceForCallback(selection.selectedPlace);
    onSelectPlace(formatted);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-95 sm:max-w-220 w-full p-6 pt-7 pb-6 rounded-[24px] sm:rounded-[32px] border-none bg-white h-160 flex flex-col gap-5">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 shrink-0">
          <DialogTitle className="text-lg sm:text-2xl font-semibold text-neutral-900 flex items-center gap-2">
            <Navigation className="size-6 text-brand-500" />
            카카오 맵 장소 검색
          </DialogTitle>
        </DialogHeader>

        {/* 1. 검색폼 */}
        <PlaceSearchForm
          keyword={search.keyword}
          onKeywordChange={search.setKeyword}
          onSearch={() => search.search(selection.selectPlace)}
        />

        {/* 2. 대형 Split View 콘텐츠 (좌: 결과 목록, 우: 대형 지도) */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 min-h-0">
          <PlaceResultList
            places={search.places}
            selectedId={selection.selectedPlace?.id}
            searchError={search.searchError}
            onSelect={selection.selectPlace}
          />
          <PlaceSearchMap
            center={selection.mapCenter}
            places={search.places}
            selectedPlace={selection.selectedPlace}
            onMapClick={handleMapClick}
            onSelectPlace={selection.selectPlace}
          />
        </div>

        {/* 3. 하단 요약 & 액션 버튼 */}
        <SelectedPlaceFooter
          selectedPlace={selection.selectedPlace}
          onCancel={handleClose}
          onConfirm={handleConfirm}
        />
      </DialogContent>
    </Dialog>
  );
}
