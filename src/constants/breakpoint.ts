export const BREAKPOINT_NUMBERS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINT_NUMBERS.sm}px)`,
  md: `(min-width: ${BREAKPOINT_NUMBERS.md}px)`,
  lg: `(min-width: ${BREAKPOINT_NUMBERS.lg}px)`,
  xl: `(min-width: ${BREAKPOINT_NUMBERS.xl}px)`,
  '2xl': `(min-width: ${BREAKPOINT_NUMBERS['2xl']}px)`,
} as const;
