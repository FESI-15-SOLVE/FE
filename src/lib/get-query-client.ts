import {
  QueryClient,
  defaultShouldDehydrateQuery,
  environmentManager,
} from '@tanstack/react-query';
import { createAppQueryClient } from '@/providers/query-provider';

function makeQueryClient(): QueryClient {
  return createAppQueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트 마운트 즉시 refetch되는 현상을 방지하기 위해 0보다 큰 staleTime이 필수입니다.
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // 기본 dehydrate 조건 또는 pending 상태의 쿼리도 포함하여 직렬화합니다.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        // Next.js가 자체적으로 서버 에러를 digest로 마스킹하고, redirect/notFound 등의 내부 에러를 정상 감지하도록 보장합니다.
        shouldRedactErrors: () => false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
