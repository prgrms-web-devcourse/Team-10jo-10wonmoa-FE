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
function setScreenSize() {
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenSize();

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
