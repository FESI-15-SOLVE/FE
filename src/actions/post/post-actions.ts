'use server';

import { actionClient } from '@/lib/safe-action';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '제목은 30자 이내로 입력해주세요.'),
  content: z.string().min(1, '본문 내용을 입력해주세요.'),
  image: z.string().nullable().optional(),
});

const updatePostSchema = z.object({
  postId: z.number(),
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(30, '제목은 30자 이내로 입력해주세요.')
    .optional(),
  content: z.string().min(1, '본문 내용을 입력해주세요.').optional(),
  image: z.string().nullable().optional(),
});

const deletePostSchema = z.object({
  postId: z.number(),
});

/**
 * 게시글 작성 Server Action
 */
export const createPostAction = actionClient
  .inputSchema(createPostSchema)
  .action(async ({ parsedInput: { title, content, image } }) => {
    const res = await ServerApi.posts.createPost(
      { teamId: TEAM_ID },
      {
        title,
        content,
        image: image ?? undefined,
      },
    );
    return res.data;
  });

/**
 * 게시글 수정 Server Action
 */
export const updatePostAction = actionClient
  .inputSchema(updatePostSchema)
  .action(async ({ parsedInput: { postId, title, content, image } }) => {
    const res = await ServerApi.posts.updatePost(
      { teamId: TEAM_ID, postId },
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(image ? { image } : {}),
      },
    );
    return res.data;
  });

/**
 * 게시글 삭제 Server Action
 */
export const deletePostAction = actionClient
  .inputSchema(deletePostSchema)
  .action(async ({ parsedInput: { postId } }) => {
    const res = await ServerApi.posts.deletePost({
      teamId: TEAM_ID,
      postId,
    });
    return res.data;
  });
