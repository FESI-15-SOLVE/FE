'use server';

import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';

export async function addFavoriteAction(meetingId: number) {
  try {
    const response = await ServerApi.favorites.addFavorite({
      teamId: TEAM_ID,
      meetingId,
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: '찜하기 추가 중 알 수 없는 에러가 발생했습니다.',
    };
  }
}

export async function removeFavoriteAction(meetingId: number) {
  try {
    const response = await ServerApi.favorites.removeFavorite({
      teamId: TEAM_ID,
      meetingId,
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: '찜하기 취소 중 알 수 없는 에러가 발생했습니다.',
    };
  }
}
