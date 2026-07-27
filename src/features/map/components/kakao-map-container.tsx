'use client';

import React from 'react';
import { useKakaoLoader, Map } from 'react-kakao-maps-sdk';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LatLng } from '../utils/to-lat-lng';

export interface KakaoMapContainerProps {
  center: LatLng;
  level?: number;
  className?: string;
  onClick?: (_map: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => void;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  children?: React.ReactNode;
}

export function KakaoMapContainer({
  center,
  level = 4,
  className,
  onClick,
  loadingFallback,
  errorFallback,
  children,
}: KakaoMapContainerProps) {
  const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  // 카카오 맵 JS SDK 로드
  const [loading, error] = useKakaoLoader({
    appkey: kakaoAppKey || '',
    libraries: ['services'],
  });

  const containerStyle = cn(
    'w-full h-full rounded-2xl overflow-hidden border border-neutral-200 relative bg-neutral-100',
    className,
  );

  // 1. API 키 미설정 또는 SDK 에러 상태
  if (!kakaoAppKey || error) {
    if (errorFallback) {
      return <div className={containerStyle}>{errorFallback}</div>;
    }

    return (
      <div className={containerStyle}>
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-neutral-500 space-y-2">
          <AlertCircle className="size-8 text-red-400" />
          <p className="text-sm font-semibold text-neutral-700">
            지도를 불러오지 못했습니다.
          </p>
          <p className="text-xs text-neutral-400">
            {!kakaoAppKey
              ? 'NEXT_PUBLIC_KAKAO_MAP_KEY 환경변수가 설정되지 않았습니다.'
              : '카카오 API 키(.env.local) 및 도메인 설정을 확인해 주세요.'}
          </p>
        </div>
      </div>
    );
  }

  // 2. 스크립트 로딩 중 상태
  if (loading) {
    if (loadingFallback) {
      return <div className={containerStyle}>{loadingFallback}</div>;
    }

    return (
      <div className={containerStyle}>
        <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
          카카오 지도를 로딩 중입니다...
        </div>
      </div>
    );
  }

  // 3. 정상 지도 렌더링
  return (
    <div className={containerStyle}>
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        level={level}
        onClick={onClick}
      >
        {children}
      </Map>
    </div>
  );
}
