import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout, Loading } from '@components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRouter from '@router';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 임시로 staleTime 1분으로 정함. 추후 정책 정해야 함
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <AppLayout>
          <AppRouter />
          <Loading />
        </AppLayout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
