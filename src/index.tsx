import * as React from 'react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
const queryClient = new QueryClient();

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browsers');
  worker.start();
}

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
