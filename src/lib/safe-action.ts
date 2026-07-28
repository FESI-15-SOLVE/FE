import { createSafeActionClient } from 'next-safe-action';
import { ErrorResponse } from '@/api';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ErrorResponse) {
      return {
        message: e.message,
        code: e.code,
        status: e.status || 400,
      };
    }
    console.error('[Server Action Error]:', e);
    return {
      message: '알 수 없는 오류가 발생했습니다.',
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
    };
  },
});
