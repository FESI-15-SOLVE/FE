'use server';

import { z } from 'zod';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { actionClient } from '@/lib/safe-action';

export const createReviewAction = actionClient
  .inputSchema(
    z.custom<{
      meetingId: number;
      score: number;
      comment: string;
    }>(),
  )
  .action(async ({ parsedInput: { meetingId, score, comment } }) => {
    const response = await ServerApi.reviews.createReview(
      { teamId: TEAM_ID, meetingId },
      { score, comment },
    );
    return response.data;
  });

export const updateReviewAction = actionClient
  .inputSchema(
    z.custom<{
      reviewId: number;
      score: number;
      comment: string;
    }>(),
  )
  .action(async ({ parsedInput: { reviewId, score, comment } }) => {
    const response = await ServerApi.reviews.updateReview(
      { teamId: TEAM_ID, reviewId },
      { score, comment },
    );
    return response.data;
  });

export const deleteReviewAction = actionClient
  .inputSchema(
    z.custom<{
      reviewId: number;
    }>(),
  )
  .action(async ({ parsedInput: { reviewId } }) => {
    const response = await ServerApi.reviews.deleteReview({
      teamId: TEAM_ID,
      reviewId,
    });
    return response.data;
  });



