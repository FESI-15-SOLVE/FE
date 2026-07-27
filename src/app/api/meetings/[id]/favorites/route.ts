import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (isNaN(meetingId)) {
      return NextResponse.json(
        { message: '유효하지 않은 모임 ID입니다.' },
        { status: 400 },
      );
    }

    const res = await ServerApi.favorites.addFavorite({
      teamId: TEAM_ID,
      meetingId,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: error.status || 400 },
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const meetingId = Number(id);

    if (isNaN(meetingId)) {
      return NextResponse.json(
        { message: '유효하지 않은 모임 ID입니다.' },
        { status: 400 },
      );
    }

    const res = await ServerApi.favorites.removeFavorite({
      teamId: TEAM_ID,
      meetingId,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: error.status || 400 },
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
