// 설계 배경 및 결정 이유: docs/server-action-error-handling.md 참고
import {
  createSafeActionClient,
  type InferServerError,
} from 'next-safe-action';
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

/** handleServerError의 반환 타입을 actionClient로부터 직접 추론 */
type ServerError = InferServerError<typeof actionClient>;

/**
 * next-safe-action 결과 객체를 언랩하여 data를 반환하거나 ErrorResponse를 throw한다.
 * React Query mutationFn 내부에서 사용. 상세 배경: docs/server-action-error-handling.md
 */
export function unwrapAction<T>(result: {
  data?: T;
  serverError?: ServerError;
}): NonNullable<T> {
  if (result?.serverError) {
    throw new ErrorResponse(
      result.serverError.message,
      result.serverError.code,
      result.serverError.status,
    );
  }

  if (result?.data === undefined) {
    throw new ErrorResponse(
      '응답 데이터가 존재하지 않습니다.',
      'EMPTY_RESPONSE',
      500,
    );
  }

  return result.data as NonNullable<T>;
}
