'use server';

import { ErrorResponse, ServerApi } from '@/api';
import { TEAM_ID } from '@/constants/api';
import { PresignedUrlRequest } from '@/api/data-contracts';

export async function getPresignedUrlAction(data: PresignedUrlRequest) {
  try {
    const response = await ServerApi.images.createPresignedUrl({ teamId: TEAM_ID }, data);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof ErrorResponse) {
      return { success: false, message: error.message };
    }
    return { success: false, message: '이미지 업로드용 Presigned URL 발급에 실패했습니다.' };
  }
}
