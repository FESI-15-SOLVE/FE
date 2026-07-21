import { useState } from "react";

export interface UseHoverPreviewOptions {
  score: number;
  readOnly?: boolean;
}

export function useHoverPreview({
  score = 0,
  readOnly = false,
}: UseHoverPreviewOptions) {
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const displayScore = hoverScore ?? score;

  const handleItemHover = (index: number) => {
    if (readOnly) return;
    setHoverScore(index + 1);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverScore(null);
  };

  return {
    hoverScore,
    displayScore,
    handleItemHover,
    handleMouseLeave,
  };
}
