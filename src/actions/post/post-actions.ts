'use server';

import { revalidateTag } from 'next/cache';
import { actionClient } from '@/lib/safe-action';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { CACHE_TAGS } from '@/constants/cache-tags';
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  postIdParamSchema,
  createCommentSchema,
  updateCommentSchema,
  deleteCommentSchema,
  commentIdParamSchema,
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
    // 새 게시글 등록 시 목록 캐시(SSR + Route Handler) 한번에 무효화
    revalidateTag(CACHE_TAGS.POSTS_LIST, 'max');
    revalidateTag(CACHE_TAGS.POSTS_HOT, 'max');
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
    // 수정된 내용은 공용 데이터이므로 목록 + 상세 캐시 한번에 무효화
    revalidateTag(CACHE_TAGS.POSTS_LIST, 'max');
    revalidateTag(CACHE_TAGS.POSTS_HOT, 'max');
    revalidateTag(CACHE_TAGS.postDetail(postId), 'max');
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
    // 삭제 후 목록 + 상세 캐시 한번에 무효화 (뒤로가기 시 구 데이터 방지)
    revalidateTag(CACHE_TAGS.POSTS_LIST, 'max');
    revalidateTag(CACHE_TAGS.POSTS_HOT, 'max');
    revalidateTag(CACHE_TAGS.postDetail(postId), 'max');
    return res.data;
  });

/**
 * 게시글 좋아요 Server Action
 */
export const likePostAction = actionClient
  .inputSchema(postIdParamSchema)
  .action(async ({ parsedInput: { postId } }) => {
    const res = await ServerApi.posts.likePost({
      teamId: TEAM_ID,
      postId,
    });
    return res.data;
  });

/**
 * 게시글 좋아요 취소 Server Action
 */
export const unlikePostAction = actionClient
  .inputSchema(postIdParamSchema)
  .action(async ({ parsedInput: { postId } }) => {
    const res = await ServerApi.posts.unlikePost({
      teamId: TEAM_ID,
      postId,
    });
    return res.data;
  });

/**
 * 댓글 작성 Server Action
 */
export const createCommentAction = actionClient
  .inputSchema(createCommentSchema)
  .action(async ({ parsedInput: { postId, content } }) => {
    const res = await ServerApi.posts.createComment(
      { teamId: TEAM_ID, postId },
      { content },
    );
    // 댓글은 해당 상세 페이지 캐시만 무효화
    revalidateTag(CACHE_TAGS.postDetail(postId), 'max');
    return res.data;
  });

/**
 * 댓글 수정 Server Action
 */
export const updateCommentAction = actionClient
  .inputSchema(updateCommentSchema)
  .action(async ({ parsedInput: { postId, commentId, content } }) => {
    const res = await ServerApi.posts.updateComment(
      { teamId: TEAM_ID, postId, commentId },
      { content },
    );
    revalidateTag(CACHE_TAGS.postDetail(postId), 'max');
    return res.data;
  });

/**
 * 댓글 삭제 Server Action
 */
export const deleteCommentAction = actionClient
  .inputSchema(deleteCommentSchema)
  .action(async ({ parsedInput: { postId, commentId } }) => {
    const res = await ServerApi.posts.deleteComment({
      teamId: TEAM_ID,
      postId,
      commentId,
    });
    revalidateTag(CACHE_TAGS.postDetail(postId), 'max');
    return res.data;
  });

/**
 * 댓글 좋아요 Server Action
 */
export const likeCommentAction = actionClient
  .inputSchema(commentIdParamSchema)
  .action(async ({ parsedInput: { postId, commentId } }) => {
    const res = await ServerApi.posts.likeComment({
      teamId: TEAM_ID,
      postId,
      commentId,
    });
    return res.data;
  });

/**
 * 댓글 좋아요 취소 Server Action
 */
export const unlikeCommentAction = actionClient
  .inputSchema(commentIdParamSchema)
  .action(async ({ parsedInput: { postId, commentId } }) => {
    const res = await ServerApi.posts.unlikeComment({
      teamId: TEAM_ID,
      postId,
      commentId,
    });
    return res.data;
  });
