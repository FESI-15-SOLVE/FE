import { useCallback } from 'react';
import { PlaceResultItem } from '../types';

export function useReverseGeocode() {
  const reverseGeocode = useCallback(
    (lng: number, lat: number, onResult: (place: PlaceResultItem) => void) => {
      if (
        typeof window === 'undefined' ||
        !window.kakao ||
        !window.kakao.maps ||
        !window.kakao.maps.services
      ) {
        return;
      }

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
            isCustomPin: true,
          };

          onResult(customPlace);
        }
      });
    },
    [],
  );

  return { reverseGeocode };
}
