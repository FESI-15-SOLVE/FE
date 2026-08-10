'use server';

import { actionClient } from '@/lib/safe-action';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from '@/features/post/schema/post-schema';

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
