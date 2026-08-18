import { describe, it, expect } from 'vitest';
import { unwrapAction } from '../safe-action';
import { ErrorResponse } from '../error-response';

describe('unwrapAction 유틸리티', () => {
  it('data가 정상적으로 전달되면 해당 데이터를 반환한다', () => {
    const result = { data: { id: 1, name: '테스트' } };
    const unwrapped = unwrapAction(result);

    expect(unwrapped).toEqual({ id: 1, name: '테스트' });
  });

  it('serverError가 존재하면 ErrorResponse 예외를 발생시킨다', () => {
    const result = {
      serverError: {
        message: '권한이 없습니다.',
        code: 'FORBIDDEN',
        status: 403,
      },
    };

    expect(() => unwrapAction(result)).toThrow(ErrorResponse);

    try {
      unwrapAction(result);
    } catch (e) {
      expect(e).toBeInstanceOf(ErrorResponse);
      const err = e as ErrorResponse;
      expect(err.message).toBe('권한이 없습니다.');
      expect(err.code).toBe('FORBIDDEN');
      expect(err.status).toBe(403);
    }
  });

  it('data가 undefined이면 EMPTY_RESPONSE ErrorResponse 예외를 발생시킨다', () => {
    const result = { data: undefined };

    expect(() => unwrapAction(result)).toThrow(ErrorResponse);

    try {
      unwrapAction(result);
    } catch (e) {
      expect(e).toBeInstanceOf(ErrorResponse);
      const err = e as ErrorResponse;
      expect(err.message).toBe('응답 데이터가 존재하지 않습니다.');
      expect(err.code).toBe('EMPTY_RESPONSE');
      expect(err.status).toBe(500);
    }
  });

  it('result 인자가 빈 객체 형태일 때도 EMPTY_RESPONSE 예외를 발생시킨다', () => {
    expect(() => unwrapAction({})).toThrow(ErrorResponse);
  });
});
