import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browsers');
  worker.start();
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
