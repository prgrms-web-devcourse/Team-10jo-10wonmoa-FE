import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout } from '@components';
import AppRouter from '@router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
