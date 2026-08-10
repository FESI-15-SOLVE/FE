import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetJoinedMeetingsParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const completed = (searchParams.get('completed') as 'true' | 'false') || undefined;
  const reviewed = (searchParams.get('reviewed') as 'true' | 'false') || undefined;
  const sortBy = (searchParams.get('sortBy') as GetJoinedMeetingsParams['sortBy']) || undefined;
  const sortOrder = (searchParams.get('sortOrder') as GetJoinedMeetingsParams['sortOrder']) || undefined;
  const cursor = searchParams.get('cursor') || undefined;
  const size = searchParams.get('size')
    ? Number(searchParams.get('size'))
    : undefined;

  const res = await ServerApi.meetings.getJoinedMeetings({
    teamId: TEAM_ID,
    completed,
    reviewed,
    sortBy,
    sortOrder,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
