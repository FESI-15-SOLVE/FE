import { z } from 'zod';

export const profileEditSchema = z.object({
  name: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(20, '닉네임은 최대 20자까지 입력 가능합니다.'),
  image: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
