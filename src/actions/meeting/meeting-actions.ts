'use server';

import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { CreateMeeting } from '@/api/data-contracts';

export async function createMeetingAction(data: CreateMeeting) {
  try {
    const response = await ServerApi.meetings.createMeeting({ teamId: TEAM_ID }, data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }
    return { success: false, message: '모임 생성 중 알 수 없는 에러가 발생했습니다.' };
  }
}
