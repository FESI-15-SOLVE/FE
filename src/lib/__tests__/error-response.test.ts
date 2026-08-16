import { describe, it, expect } from 'vitest';
import { ErrorResponse } from '../error-response';

describe('ErrorResponse', () => {
  it('ErrorResponse 인스턴스가 올바른 message, code, status를 가지며 Error를 상속해야 한다', () => {
    const error = new ErrorResponse('인증 실패', 'UNAUTHORIZED', 401);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ErrorResponse);
    expect(error.message).toBe('인증 실패');
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.status).toBe(401);
    expect(error.name).toBe('ErrorResponse');
  });
});
