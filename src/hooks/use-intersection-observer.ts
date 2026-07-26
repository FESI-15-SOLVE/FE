import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  /**
   * 요소가 뷰포트에 노출되었을 때 실행할 콜백 함수
   */
  onIntersect: () => void;
  /**
   * 옵저버 활성화 여부 (기본값: true)
   * 예: hasNextPage && !isFetchingNextPage
   */
  enabled?: boolean;
  /**
   * 감지 임계값 (0.0 ~ 1.0, 기본값: 0.1)
   */
  threshold?: number;
  /**
   * 마진 설정 (기본값: '0px')
   */
  rootMargin?: string;
}

/**
 * 무한 스크롤 및 요소 뷰포트 감지를 위한 범용 IntersectionObserver 커스텀 훅
 */
export function useIntersectionObserver<
  T extends HTMLElement = HTMLDivElement,
>({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px',
}: UseIntersectionObserverOptions) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onIntersect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect, threshold, rootMargin]);

  return ref;
}
