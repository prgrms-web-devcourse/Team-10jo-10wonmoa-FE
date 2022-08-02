import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

if (process.env.REACT_APP_MOCK_API) {
  const { worker } = require('./mocks/browsers');
  worker.start();
}

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
