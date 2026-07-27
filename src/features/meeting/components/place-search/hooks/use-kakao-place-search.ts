import { useState, useRef, useCallback } from 'react';
import { PlaceResultItem } from '../types';

export function useKakaoPlaceSearch() {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<PlaceResultItem[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // 비동기 검색 Race Condition 방지를 위한 카운터
  const lastSearchIdRef = useRef(0);

  const search = useCallback(
    (onFirstResult?: (place: PlaceResultItem) => void) => {
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword) return;

      if (
        typeof window === 'undefined' ||
        !window.kakao ||
        !window.kakao.maps ||
        !window.kakao.maps.services
      ) {
        setSearchError(
          '카카오 맵 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      const currentSearchId = ++lastSearchIdRef.current;
      setSearchError(null);

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(trimmedKeyword, (data, status) => {
        // 최신 검색 요청이 아니면 콜백 무시 (Race condition 방지)
        if (currentSearchId !== lastSearchIdRef.current) return;

        if (status === window.kakao.maps.services.Status.OK) {
          const resultList = data;
          setPlaces(resultList);
          if (resultList.length > 0 && onFirstResult) {
            onFirstResult(resultList[0]);
          }
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          setPlaces([]);
          setSearchError('검색 결과가 존재하지 않습니다.');
        } else {
          setPlaces([]);
          setSearchError('검색 중 오류가 발생했습니다.');
        }
      });
    },
    [keyword],
  );

  const reset = useCallback(() => {
    setKeyword('');
    setPlaces([]);
    setSearchError(null);
    lastSearchIdRef.current = 0;
  }, []);

  return {
    keyword,
    setKeyword,
    places,
    searchError,
    search,
    reset,
  };
}
