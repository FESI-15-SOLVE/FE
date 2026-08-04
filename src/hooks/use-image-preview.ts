'use client';

import { useMemo, useEffect } from 'react';

/**
 * File | string | null 형태의 이미지 값으로부터 안전하게 previewUrl을 생성하고,
 * 컴포넌트 언마운트 시 또는 파일 변경 시 URL.revokeObjectURL 메모리 누수를 자동으로 방지해 주는 커스텀 훅.
 */
export function useImagePreview(value?: File | string | null) {
  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl && typeof value !== 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  return previewUrl;
}
