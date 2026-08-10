import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetMyCreatedMeetingsParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const sortBy = (searchParams.get('sortBy') as GetMyCreatedMeetingsParams['sortBy']) || undefined;
  const sortOrder = (searchParams.get('sortOrder') as GetMyCreatedMeetingsParams['sortOrder']) || undefined;
  const cursor = searchParams.get('cursor') || undefined;
  const size = searchParams.get('size') ? Number(searchParams.get('size')) : 10;

  const res = await ServerApi.meetings.getMyCreatedMeetings({
    teamId: TEAM_ID,
    sortBy,
    sortOrder,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
