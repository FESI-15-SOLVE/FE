import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetNotificationsParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const isRead = (searchParams.get('isRead') as GetNotificationsParams['isRead']) || undefined;
  const cursor = searchParams.get('cursor') || undefined;
  const size = searchParams.get('size') ? Number(searchParams.get('size')) : 10;

  const res = await ServerApi.notifications.getNotifications({
    teamId: TEAM_ID,
    isRead,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
