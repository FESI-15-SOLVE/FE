import { RatingDisplay, type RatingDisplayProps } from "./rating-display";
import { RatingInput, type RatingInputProps } from "./rating-input";

export type RatingProps =
  | ({ readOnly?: true } & RatingDisplayProps)
  | ({ readOnly: false } & RatingInputProps);

/**
 * 평점 컴포넌트
 * - `readOnly` (기본값 true): Server Component인 RatingDisplay를 렌더링
 * - `readOnly={false}`: "use client" 인 RatingInput을 렌더링
 */
export function Rating({ readOnly = true, ...props }: RatingProps) {
  if (!readOnly) {
    return <RatingInput {...(props as RatingInputProps)} />;
  }
  return <RatingDisplay {...(props as RatingDisplayProps)} />;
}

export { ratingVariants } from "./rating-display";
export type { RatingDisplayProps } from "./rating-display";
export type { RatingInputProps } from "./rating-input";
export { RatingDisplay } from "./rating-display";
export { RatingInput } from "./rating-input";
export default Rating;
