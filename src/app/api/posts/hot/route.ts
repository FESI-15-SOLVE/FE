import { NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * HOT 베스트 게시글 목록 조회 BFF Route Handler (60초 ISR/Micro-caching)
 */
export const GET = withErrorHandler(async () => {
  const res = await ServerApi.posts.getPosts(
    {
      teamId: TEAM_ID,
      type: 'best',
      size: 4,
    },
    { next: { revalidate: 60 }, secure: false },
  );

  return NextResponse.json(res.data, { status: res.status });
});
