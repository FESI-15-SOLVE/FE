import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetFavoritesParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const rawParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );

  const queryParams: GetFavoritesParams = {
    teamId: TEAM_ID,
    type: rawParams.type || undefined,
    region: rawParams.region || undefined,
    dateStart: rawParams.dateStart || undefined,
    dateEnd: rawParams.dateEnd || undefined,
    sortBy: (rawParams.sortBy as GetFavoritesParams['sortBy']) || undefined,
    sortOrder: (rawParams.sortOrder as GetFavoritesParams['sortOrder']) || undefined,
    cursor: rawParams.cursor || undefined,
    size: rawParams.size ? Number(rawParams.size) : undefined,
  };

  const res = await ServerApi.favorites.getFavorites(queryParams);

  return NextResponse.json(res.data, { status: res.status });
});
