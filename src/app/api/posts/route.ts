import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';
import { GetPostsParams } from '@/api/data-contracts';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const rawSize = searchParams.get('size');
  const size = rawSize ? Number(rawSize) : undefined;
  if (size !== undefined && (isNaN(size) || size <= 0)) {
    return NextResponse.json(
      { code: 'BAD_REQUEST', message: '유효하지 않은 페이지 크기입니다.' },
      { status: 400 },
    );
  }

  const rawType = searchParams.get('type');
  const type = rawType ? (rawType as GetPostsParams['type']) : undefined;

  const rawSortBy = searchParams.get('sortBy');
  const sortBy = rawSortBy ? (rawSortBy as GetPostsParams['sortBy']) : undefined;

  const cursor = searchParams.get('cursor') || undefined;

  const res = await ServerApi.posts.getPosts({
    teamId: TEAM_ID,
    type,
    sortBy,
    cursor,
    size,
  });

  return NextResponse.json(res.data, { status: res.status });
});
