import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/lib/error-response';

export type RouteContext<P extends Record<string, string> = Record<string, string>> = {
  params?: Promise<P>;
};

export function handleApiError(error: unknown) {
  if (error instanceof ErrorResponse) {
    return NextResponse.json(
      { message: error.message, code: error.code },
      { status: error.status },
    );
  }

  console.error('[API Error]:', error);
  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 },
  );
}

export function withErrorHandler<T = RouteContext>(
  handler: (request: NextRequest, context: T) => Promise<NextResponse>,
) {
  return async (request: NextRequest, context: T) => {
    try {
      return await handler(request, context);
    } catch (error: unknown) {
      return handleApiError(error);
    }
  };
}

