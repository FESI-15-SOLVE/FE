import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get('cursor') || undefined;
  const size = searchParams.get('size')
    ? Number(searchParams.get('size'))
    : undefined;

  const res = await ServerApi.meetings.getJoinedMeetings({
    teamId: TEAM_ID,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
