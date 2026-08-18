import {
  MutationCache,
  QueryClient,
  QueryClientConfig,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { ErrorResponse } from '@/lib/error-response';

export function createAppQueryClient(config?: QueryClientConfig): QueryClient {
  return new QueryClient({
    ...config,
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        ...config?.defaultOptions?.queries,
      },
      mutations: {
        ...config?.defaultOptions?.mutations,
      },
      dehydrate: {
        ...config?.defaultOptions?.dehydrate,
      },
    },
    mutationCache:
      config?.mutationCache ??
      new MutationCache({
        onSuccess: (data, variables, _ctx, mutation) => {
          const { toastMessage } = mutation.meta ?? {};
          if (!toastMessage) return;

          const message =
            typeof toastMessage === 'function'
              ? toastMessage(variables, data)
              : toastMessage;

          if (message) toast.success(message);
        },

        onError: (error, variables, _ctx, mutation) => {
          const { errorMessage } = mutation.meta ?? {};
          const message =
            error instanceof ErrorResponse
              ? error.message
              : typeof errorMessage === 'function'
                ? errorMessage(variables, error)
                : (errorMessage ?? '처리 중 오류가 발생했습니다.');
          toast.error(message);
        },
      }),
  });
}
