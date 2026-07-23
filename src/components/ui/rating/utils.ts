/**
 * 평점 컴포넌트(Rating)에서 사용하는 점수 정규화 헬퍼 함수
 * 0 이하, NaN, Infinity, 실수 등 비정상적인 값이 주어졌을 때 안전한 범위로 변환.
 */
export function getSafeRatingScores(score?: number, maxScore?: number) {
  const safeMaxScore =
    Number.isFinite(maxScore) && maxScore! > 0 ? Math.floor(maxScore!) : 5;

  const safeScore = Number.isFinite(score)
    ? Math.max(0, Math.min(score!, safeMaxScore))
    : 0;

  return { safeScore, safeMaxScore };
}
