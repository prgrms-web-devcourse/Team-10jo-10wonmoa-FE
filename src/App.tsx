import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout, Loading } from '@components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { queryClient } from '@api/react-query/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRouter from '@router';
import useApiError from '@hooks/useApiError';
const App = () => {
  const { handleError } = useApiError();

  return (
    <QueryClientProvider client={queryClient(handleError)}>
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
