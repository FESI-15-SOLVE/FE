'use client';

import { MapPin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { KakaoMapContainer } from '@/features/map/components/kakao-map-container';
import { toast } from 'sonner';

export interface MeetingLocationMapProps {
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
  region?: string;
}

export function MeetingLocationMap({
  latitude,
  longitude,
  address,
  region,
}: MeetingLocationMapProps) {
  const [copied, setCopied] = useState(false);

  // 기본 위치 좌표 (없을 경우 N서울타워)
  const lat = latitude || 37.5511699;
  const lng = longitude || 126.988227;
  const fullAddress = address || region || '주소 정보 없음';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      toast.success('주소가 클립보드에 복사되었습니다.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('주소 복사에 실패했습니다.');
    }
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-4">
        <MapPin className="size-5 text-brand-500" />
        <span>모임 장소</span>
      </div>

      {/* 대형 카카오 지도 렌더링 영역 (KakaoMapContainer 재사용) */}
      <div className="w-full h-70 sm:h-80 rounded-2xl overflow-hidden border border-neutral-200 relative">
        <KakaoMapContainer center={{ lat, lng }} level={3}>
          <MapMarker position={{ lat, lng }} />
        </KakaoMapContainer>
      </div>

      {/* 하단 주소 텍스트 & 복사 버튼 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-800 truncate">
          <MapPin className="size-4 text-neutral-500 shrink-0" />
          <span className="truncate">{fullAddress}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-green-600" />
              <span className="text-green-600">복사 완료</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-neutral-500" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
