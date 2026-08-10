import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '제목은 30자 이내로 입력해주세요.'),
  content: z.string().min(1, '본문 내용을 입력해주세요.'),
  image: z.string().nullable().optional(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  postId: z.number(),
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '제목은 30자 이내로 입력해주세요.')
    .optional(),
  content: z.string().min(1, '본문 내용을 입력해주세요.').optional(),
  image: z.string().nullable().optional(),
});

export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;

export const deletePostSchema = z.object({
  postId: z.number(),
});

export type DeletePostFormValues = z.infer<typeof deletePostSchema>;
