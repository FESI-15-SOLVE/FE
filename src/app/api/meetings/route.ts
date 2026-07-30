import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { getMeetingsQuerySchema } from '@/features/meeting/schema/meeting-query-schema';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import z from 'zod';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const rawParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const parsed = getMeetingsQuerySchema.safeParse(rawParams);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: '잘못된 쿼리 파라미터 요청입니다.',
        errors: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const teamId = TEAM_ID;

  const res = await ServerApi.meetings.getMeetings({
    teamId,
    ...parsed.data,
  });

  return NextResponse.json(res.data, { status: res.status });
});

