import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api/server-api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler, RouteContext } from '@/lib/api-handler';

export const GET = withErrorHandler<RouteContext<{ id: string }>>(
  async (_request: NextRequest, context) => {
    const params = await context.params;
    const postId = Number(params?.id);

    const res = await ServerApi.posts.getPostDetail({
      teamId: TEAM_ID,
      postId,
    });

    return NextResponse.json(res.data, { status: res.status });
  },
);
