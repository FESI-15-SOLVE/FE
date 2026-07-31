'use client';

import { useSyncExternalStore } from 'react';
import { MEDIA_QUERIES } from '@/constants/breakpoint';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

export function useBreakpoint(key: keyof typeof MEDIA_QUERIES) {
  return useMediaQuery(MEDIA_QUERIES[key]);
}

