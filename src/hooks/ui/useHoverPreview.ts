import { useState } from "react";

export interface UseHoverPreviewOptions {
  score: number;
}

export function useHoverPreview({
  score = 0,
}: UseHoverPreviewOptions) {
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const displayScore = hoverScore ?? score;

  const handleItemHover = (index: number) => {
    setHoverScore(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverScore(null);
  };

  return {
    hoverScore,
    displayScore,
    handleItemHover,
    handleMouseLeave,
  };
}
