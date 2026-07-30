import { NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(async () => {
  const response = await ServerApi.favorites.getFavoriteCount({
    teamId: TEAM_ID,
  });
  return NextResponse.json(response.data, { status: response.status });
});
