import { z } from 'zod';
import { GetMeetingsParams } from '@/api/data-contracts';

export type SortBy = NonNullable<GetMeetingsParams['sortBy']>;
export type SortOrder = NonNullable<GetMeetingsParams['sortOrder']>;

export const SORT_BY_VALUES = [
  'dateTime',
  'registrationEnd',
  'participantCount',
  'createdAt',
] as const satisfies readonly SortBy[];

export const SORT_ORDER_VALUES = [
  'asc',
  'desc',
] as const satisfies readonly SortOrder[];

export const getMeetingsQuerySchema = z.object({
  type: z.string().optional(),
  region: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  sortBy: z.enum(SORT_BY_VALUES).optional(),
  sortOrder: z.enum(SORT_ORDER_VALUES).optional(),
  cursor: z.string().optional(),
  size: z.coerce.number().min(1).max(100).optional().default(10),
});

export type GetMeetingsQuery = z.infer<typeof getMeetingsQuerySchema>;
