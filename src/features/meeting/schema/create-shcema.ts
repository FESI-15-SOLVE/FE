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

  // 모임 일정 독립 2필드
  dateTimeDate: z.date({ error: '모임 날짜를 선택해주세요.' }),
  dateTimeTime: z.object(
    {
      hour: z.number(),
      minute: z.number(),
    },
    { error: '모임 시간을 선택해주세요.' },
  ),

  // 모집 마감 독립 2필드
  registrationEndDate: z.date({ error: '모집 마감 날짜를 선택해주세요.' }),
  registrationEndTime: z.object(
    {
      hour: z.number(),
      minute: z.number(),
    },
    { error: '모집 마감 시간을 선택해주세요.' },
  ),

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

/**
  * 날짜(Date)와 시간(Time) 독립 필드를 단일 Date 객체로 합성하는 공통 Transform 함수
  */
export const transformDateTimeFields = <
  T extends {
    dateTimeDate: Date;
    dateTimeTime: { hour: number; minute: number };
    registrationEndDate: Date;
    registrationEndTime: { hour: number; minute: number };
  },
>(
  data: T,
) => {
  const dateTime = new Date(
    data.dateTimeDate.getFullYear(),
    data.dateTimeDate.getMonth(),
    data.dateTimeDate.getDate(),
    data.dateTimeTime.hour,
    data.dateTimeTime.minute,
    0,
    0,
  );

  const registrationEnd = new Date(
    data.registrationEndDate.getFullYear(),
    data.registrationEndDate.getMonth(),
    data.registrationEndDate.getDate(),
    data.registrationEndTime.hour,
    data.registrationEndTime.minute,
    0,
    0,
  );

  return {
    ...data,
    dateTime,
    registrationEnd,
  };
};

/**
  * 합성된 Date 객체에 대한 날짜 범위 및 선후관계 공통 유효성 검증 함수
  */
export const validateDateTimeFields = (
  data: { dateTime: Date; registrationEnd: Date },
  ctx: z.RefinementCtx,
) => {
  const now = new Date();
  if (data.dateTime <= now) {
    ctx.addIssue({
      code: 'custom',
      message: '현재 시각 이후로 설정해주세요.',
      path: ['dateTimeDate'],
    });
  }
  if (data.registrationEnd <= now) {
    ctx.addIssue({
      code: 'custom',
      message: '현재 시각 이후로 설정해주세요.',
      path: ['registrationEndDate'],
    });
  }
  if (data.registrationEnd >= data.dateTime) {
    ctx.addIssue({
      code: 'custom',
      message: '마감 일정은 모임 일정 이전이어야 합니다.',
      path: ['registrationEndDate'],
    });
  }
};

export const createMeetingSchema = createMeetingBaseSchema
  .transform(transformDateTimeFields)
  .superRefine(validateDateTimeFields);

export type CreateMeetingValues = z.input<typeof createMeetingBaseSchema>;
export type CreateMeetingPayload = z.infer<typeof createMeetingSchema>;

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
  dateTimeDate: true,
  dateTimeTime: true,
  registrationEndDate: true,
  registrationEndTime: true,
  capacity: true,
  description: true,
});

export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
} as const;
