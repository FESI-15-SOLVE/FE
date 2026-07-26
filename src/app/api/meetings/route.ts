import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse, ServerApi } from '@/api';
import { getMeetingsQuerySchema } from '@/features/meeting/schema';
import { TEAM_ID } from '@/constants/api';
import z from 'zod';

export async function GET(request: NextRequest) {
  try {
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
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
