import { NextRequest, NextResponse } from 'next/server';
import { ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { withErrorHandler } from '@/lib/api-handler';

export const GET = withErrorHandler(
  async (
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ) => {
    const { id } = await params;
    const meetingId = Number(id);

    if (isNaN(meetingId)) {
      return NextResponse.json(
        { message: '유효하지 않은 모임 ID입니다.' },
        { status: 400 },
      );
    }

    const res = await ServerApi.meetings.getParticipants({
      teamId: TEAM_ID,
      meetingId,
    });

    return NextResponse.json(res.data, { status: res.status });
  },
);

