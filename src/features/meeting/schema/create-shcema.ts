// schema.ts
import { z } from 'zod';

export const createMeetingBaseSchema = z.object({
  categoryId: z.number().min(1, '모임 종류를 선택해주세요.'),
  name: z.string().trim().min(1, '모임 이름을 입력해주세요.'),
  location: z.string().trim().min(1, '장소를 입력해주세요.'),
  placeAddress: z.string().optional(),
  detailAddress: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  file: z
    .instanceof(File, { message: '이미지를 첨부해주세요.' })
    .nullable()
    .refine((val): val is File => val !== null, {
      message: '이미지를 첨부해주세요.',
    }),
  dateTime: z
    .date({ error: '모임 일정을 입력해주세요.' })
    .refine((date) => date > new Date(), {
      message: '현재 시각 이후로 설정해주세요.',
    })
    .optional(),
  registrationEnd: z
    .date({ error: '마감 일정을 입력해주세요.' })
    .refine((date) => date > new Date(), {
      message: '현재 시각 이후로 설정해주세요.',
    })
    .optional(),
  // preprocess 대신 union — input과 output shape을 일부러 동일하게 유지 (변환 X, 검증만)
  capacity: z
    .union([z.literal(''), z.number()])
    .refine((val): val is number => val !== '' && val >= 1, {
      message: '정원을 1명 이상 입력해주세요.',
    }),
  description: z
    .string()
    .max(1000, '모임 설명은 1000자 이내로 작성해주세요.')
    .optional(),
});

export const validateDateRange = (
  data: { dateTime?: Date; registrationEnd?: Date },
  ctx: z.RefinementCtx,
) => {
  if (
    data.dateTime &&
    data.registrationEnd &&
    data.registrationEnd >= data.dateTime
  ) {
    ctx.addIssue({
      code: 'custom',
      message: '마감 일정은 모임 일정 이전이어야 합니다.',
      path: ['registrationEnd'],
    });
  }
};

export const createMeetingSchema =
  createMeetingBaseSchema.superRefine(validateDateRange);

// 폼이 다루는 raw 입력 타입 (file: File | null, capacity: number | '' 등)
// RHF defaultValues / useForm 제네릭에 사용
export type CreateMeetingValues = z.input<typeof createMeetingBaseSchema>;

// 최종 제출 시 API로 나가는, 완전히 검증된 payload 타입
// (file: File, capacity: number, dateTime/registrationEnd 존재 보장)
export type CreateMeetingPayload = z.infer<typeof createMeetingSchema>;

// 스텝별 부분 스키마 — pick만 하니 필드 규칙은 base에만 존재
export const step1Schema = createMeetingBaseSchema.pick({
  categoryId: true,
});

export const step2Schema = createMeetingBaseSchema.pick({
  name: true,
  location: true,
  placeAddress: true,
  detailAddress: true,
  latitude: true,
  longitude: true,
  file: true,
});

export const step3Schema = createMeetingBaseSchema.pick({
  dateTime: true,
  registrationEnd: true,
  capacity: true,
  description: true,
});

export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
} as const;
