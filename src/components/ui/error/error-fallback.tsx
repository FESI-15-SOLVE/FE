'use client';

import { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-center my-6 w-full">
      <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">
        요청을 불러오는 중 오류가 발생했습니다.
      </h3>

      <Button onClick={resetErrorBoundary} variant="primary">
        다시 시도
      </Button>
    </div>
  );
}
