import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme, reset } from '@styles';
import { AppLayout } from '@components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <AppLayout>
        <div>10원모아10조</div>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
