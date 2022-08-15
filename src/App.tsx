import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout, Toast } from '@components';
import { QueryClientProvider } from 'react-query';
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
          <Toast />
        </AppLayout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
