import React from 'react';
import { theme } from '@styles';
import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          backgroundColor: theme.$white,
          color: theme.$text_black,
        },
        error: {
          duration: 3000,
          theme: {
            primary: 'red',
          },
        },
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
          },
        },
      }}
    />
  );
};

export default Toast;
