import { QueryClient } from 'react-query';
import type { handleError } from '@types';

export const queryClient = (handleError: handleError) =>
  new QueryClient({
    /**
     * @description
     * [임시 defaultOptions]
     * staleTime 1분으로 정함.
     * cacheTime 10분으로 정함.
     * 추후 정책 정해야 함
     */
    defaultOptions: {
      queries: {
        onError: handleError,
        staleTime: 60 * 1000,
        cacheTime: 600 * 1000,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: handleError,
      },
    },
  });
