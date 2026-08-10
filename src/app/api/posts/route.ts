import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetPostsParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const type = (searchParams.get('type') as GetPostsParams['type']) || undefined;
  const sortBy = (searchParams.get('sortBy') as GetPostsParams['sortBy']) || undefined;
  const cursor = searchParams.get('cursor') || undefined;
  const size = searchParams.get('size') ? Number(searchParams.get('size')) : undefined;

  const res = await ServerApi.posts.getPosts({
    teamId: TEAM_ID,
    type,
    sortBy,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
