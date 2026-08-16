import { z } from 'zod';
import { GetReviewsParams } from '@/api/data-contracts';

export type ReviewSortBy = NonNullable<GetReviewsParams['sortBy']>;
export type SortOrder = NonNullable<GetReviewsParams['sortOrder']>;

export const REVIEW_SORT_BY_VALUES = [
  'createdAt',
  'score',
  'participantCount',
] as const satisfies readonly ReviewSortBy[];

export const SORT_ORDER_VALUES = [
  'asc',
  'desc',
] as const satisfies readonly SortOrder[];

export const getReviewsQuerySchema = z.object({
  type: z.string().optional(),
  region: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  sortBy: z.enum(REVIEW_SORT_BY_VALUES).optional(),
  sortOrder: z.enum(SORT_ORDER_VALUES).optional(),
  cursor: z.string().optional(),
  size: z.coerce.number().min(1).max(100).optional().default(10),
});

export type GetReviewsQuery = z.infer<typeof getReviewsQuerySchema>;
