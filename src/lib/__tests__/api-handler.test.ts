import { describe, it, expect, vi } from 'vitest';
import { handleApiError, withErrorHandler } from '../api-handler';
import { ErrorResponse } from '../error-response';
import { NextRequest, NextResponse } from 'next/server';

describe('handleApiError', () => {
  it('ErrorResponse 예외 수신 시 해당 status와 code, message를 담은 NextResponse를 반환해야 한다', async () => {
    const customError = new ErrorResponse('접근 권한이 없습니다', 'FORBIDDEN', 403);
    const response = handleApiError(customError);
    expect(response.status).toBe(403);
    const json = await response.json();
    expect(json).toEqual({ message: '접근 권한이 없습니다', code: 'FORBIDDEN' });
  });

  it('일반 Error 수신 시 500 status와 Internal Server Error 메시지를 반환해야 한다', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const unknownError = new Error('Unexpected crash');
    const response = handleApiError(unknownError);
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json).toEqual({ message: 'Internal Server Error' });
    consoleSpy.mockRestore();
  });
});

describe('withErrorHandler', () => {
  it('핸들러 정상 실행 시 결과를 그대로 반환해야 한다', async () => {
    const mockHandler = vi.fn().mockResolvedValue(NextResponse.json({ ok: true }));
    const wrapped = withErrorHandler(mockHandler);
    const req = new NextRequest('http://localhost/api/test');
    const res = await wrapped(req, {});
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
  });

  it('핸들러에서 에러가 던져지면 handleApiError로 캡처하여 에러 응답을 반환해야 한다', async () => {
    const mockHandler = vi.fn().mockRejectedValue(new ErrorResponse('Not Found', 'NOT_FOUND', 404));
    const wrapped = withErrorHandler(mockHandler);
    const req = new NextRequest('http://localhost/api/test');
    const res = await wrapped(req, {});
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json).toEqual({ message: 'Not Found', code: 'NOT_FOUND' });
  });
});
