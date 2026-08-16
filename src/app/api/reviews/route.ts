import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { getReviewsQuerySchema } from '@/features/review/schema/review-query-schema';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import z from 'zod';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const rawParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const parsed = getReviewsQuerySchema.safeParse(rawParams);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: '잘못된 쿼리 파라미터 요청입니다.',
        errors: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const res = await ServerApi.reviews.getReviews({
    teamId: TEAM_ID,
    ...parsed.data,
  });

  return NextResponse.json(res.data, { status: res.status });
});
