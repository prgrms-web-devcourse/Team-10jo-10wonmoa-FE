import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout } from '@components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRouter from '@router';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
