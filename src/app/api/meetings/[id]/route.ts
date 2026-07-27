import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const teamId = TEAM_ID;

    const numId = Number(id);
    if (isNaN(numId)) {
      throw new ErrorResponse('잘못된 요청입니다.', 'invalid_meeting_id', 400);
    }

    const res = await ServerApi.meetings.getMeetingDetail({
      teamId,
      meetingId: numId,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
