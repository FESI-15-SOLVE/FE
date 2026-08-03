import { z } from 'zod';
import { createMeetingBaseSchema, validateDateRange } from './create-shcema';

export const editMeetingBaseSchema = createMeetingBaseSchema.extend({
  type: z.string().min(1, '카테고리를 선택해주세요.'),
  file: z.union([z.instanceof(File), z.string()]).nullable().optional(),
});

export const editMeetingSchema =
  editMeetingBaseSchema.superRefine(validateDateRange);

export type EditMeetingValues = z.input<typeof editMeetingBaseSchema>;
export type EditMeetingPayload = z.infer<typeof editMeetingSchema>;
