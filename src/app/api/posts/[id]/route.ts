import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler, RouteContext } from '@/lib/api-handler';

export const GET = withErrorHandler<RouteContext<{ id: string }>>(
  async (_request: NextRequest, context) => {
    const params = await context.params;
    const postId = Number(params?.id);

    if (isNaN(postId) || postId <= 0) {
      return NextResponse.json(
        { code: 'BAD_REQUEST', message: '유효하지 않은 게시글 ID입니다.' },
        { status: 400 },
      );
    }

    const res = await ServerApi.posts.getPostDetail(
      {
        teamId: TEAM_ID,
        postId,
      },
      { cache: 'no-store' },
    );

    return NextResponse.json(res.data, { status: res.status });
  },
);
