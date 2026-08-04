import { z } from 'zod';
import {
  createMeetingBaseSchema,
  transformDateTimeFields,
  validateDateTimeFields,
} from './create-shcema';

export const editMeetingBaseSchema = createMeetingBaseSchema.extend({
  categoryId: z.number().optional(),
  type: z.string().min(1, '카테고리를 선택해주세요.'),
  file: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .refine((val) => val !== null && val !== undefined && val !== '', {
      message: '이미지를 첨부해주세요.',
    }),
});

export const editMeetingSchema = editMeetingBaseSchema
  .transform(transformDateTimeFields)
  .superRefine(validateDateTimeFields);

export type EditMeetingValues = z.input<typeof editMeetingBaseSchema>;
export type EditMeetingPayload = z.infer<typeof editMeetingSchema>;
