import { useEffect, useRef } from "react";

export function useScrollToCenter<
  T extends HTMLElement = HTMLElement,
  C extends HTMLElement = HTMLElement,
>(dependency: unknown) {
  const selectedRef = useRef<T>(null);
  const containerRef = useRef<C>(null);

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = selectedRef.current;

      const scrollPos =
        element.offsetTop -
        container.clientHeight / 2 +
        element.clientHeight / 2;

      container.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
  }, [dependency]);

  return { selectedRef, containerRef };
}
