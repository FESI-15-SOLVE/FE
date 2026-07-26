import { z } from 'zod';

/**
 * 모임 생성에 필요한 전체 입력값 마스터 Zod 스키마 정의
 */
export const createMeetingBaseSchema = z.object({
  categoryId: z
    .string({ error: '모임 종류를 선택해주세요.' })
    .min(1, '모임 종류를 선택해주세요.'),
  name: z.string().trim().min(1, '모임 이름을 입력해주세요.'),
  location: z.string().trim().min(1, '장소를 입력해주세요.'),
  detailAddress: z.string().optional(),
  file: z.instanceof(File, { message: '이미지를 첨부해주세요.' }),
  dateTime: z
    .date({
      error: '모임 일정을 입력해주세요.',
    })
    .refine((date) => date > new Date(), {
      message: '현재 시각 이후로 설정해주세요.',
    }),
  registrationEnd: z
    .date({
      error: '마감 일정을 입력해주세요.',
    })
    .refine((date) => date > new Date(), {
      message: '현재 시각 이후로 설정해주세요.',
    }),
  capacity: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z
      .number({ error: '정원을 입력해주세요.' })
      .min(1, '정원은 1명 이상이어야 합니다.'),
  ),
  description: z
    .string()
    .max(1000, '모임 설명은 1000자 이내로 작성해주세요.')
    .optional(),
});

export const createMeetingSchema = createMeetingBaseSchema.superRefine(
  (data, ctx) => {
    if (data.dateTime && data.registrationEnd) {
      if (data.registrationEnd >= data.dateTime) {
        ctx.addIssue({
          code: 'custom',
          message: '마감 일정은 모임 일정 이전이어야 합니다.',
          path: ['registrationEnd'],
        });
      }
    }
  },
);

// 최종 제출 시 API로 넘어가는, 완전히 검증된 payload 타입
export type CreateMeetingPayload = z.infer<typeof createMeetingSchema>;

// 스텝별 부분 스키마 — 전체 스키마에서 pick만 하니 규칙이 한 곳에만 존재
export const step1Schema = createMeetingBaseSchema.pick({
  categoryId: true,
});

export const step2Schema = createMeetingBaseSchema.pick({
  name: true,
  location: true,
  detailAddress: true,
  file: true,
});

export const step3Schema = createMeetingBaseSchema
  .pick({
    dateTime: true,
    registrationEnd: true,
    capacity: true,
    description: true,
  })
  .superRefine((data, ctx) => {
    if (data.dateTime && data.registrationEnd) {
      if (data.registrationEnd >= data.dateTime) {
        ctx.addIssue({
          code: 'custom',
          message: '마감 일정은 모임 일정 이전이어야 합니다.',
          path: ['registrationEnd'],
        });
      }
    }
  });

export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
} as const;
