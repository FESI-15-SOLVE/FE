import { useState, useCallback } from 'react';
import { PlaceResultItem, LatLng } from '../types';

export function usePlaceSelection(defaultCenter: LatLng) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceResultItem | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>(defaultCenter);

  const selectPlace = useCallback((place: PlaceResultItem) => {
    setSelectedPlace(place);
    setMapCenter({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
  }, []);

  const reset = useCallback(() => {
    setSelectedPlace(null);
    setMapCenter(defaultCenter);
  }, [defaultCenter]);

  return {
    selectedPlace,
    mapCenter,
    selectPlace,
    reset,
  };
}
