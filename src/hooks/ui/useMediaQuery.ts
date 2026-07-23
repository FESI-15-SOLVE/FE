'use client';

import { useSyncExternalStore } from 'react';

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
