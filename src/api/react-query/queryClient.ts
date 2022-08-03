import { QueryClient } from 'react-query';

// TODO: 소니 에러핸들링 연결
const queryErrorHandler = (error: unknown): void => {
  const message =
    error instanceof Error ? error.message : 'error connecting to server';
  alert(message);
};

export const queryClient = new QueryClient({
  /**
   * @description
   * [임시 defaultOptions]
   * staleTime 1분으로 정함.
   * cacheTime 10분으로 정함.
   * 추후 정책 정해야 함
   */
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 60 * 1000,
      cacheTime: 600 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
