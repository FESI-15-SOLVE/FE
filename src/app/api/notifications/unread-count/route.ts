import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(async (_request: NextRequest) => {
  const res = await ServerApi.notifications.getUnreadNotificationCount({
    teamId: TEAM_ID,
  });
  return NextResponse.json(res.data, { status: res.status });
});
