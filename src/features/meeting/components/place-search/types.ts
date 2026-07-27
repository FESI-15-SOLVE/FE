export interface PlaceResultItem {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // lng
  y: string; // lat
  isCustomPin?: boolean; // 수동 클릭 핀 구분을 위한 명시적 플래그
}

export interface PlaceSelectInfo {
  extractedRegion: string;
  placeAddress: string;
  lat: number;
  lng: number;
}

export interface PlaceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (placeInfo: PlaceSelectInfo) => void;
}

export interface LatLng {
  lat: number;
  lng: number;
}
