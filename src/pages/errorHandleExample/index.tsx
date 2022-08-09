import useApiError from '@hooks/useApiError';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import type { ErrorMessageBody } from '@types';

const fetchLogin = () => axios.get('/400error');
const ErrorHandleExample = () => {
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const handle400 = {
    400: {
      default: (error: AxiosError) => {
        if (error.response?.data) {
          const errorMessage = (error.response?.data as ErrorMessageBody)
            .errorMessage;
          setLoginErrorMsg(errorMessage);
        }
      },
    },
  };

  const { handleError } = useApiError(handle400);

  const { data, isError } = useQuery(
    '400error',
    async () => {
      const response = await fetchLogin();
      return response;
    },
    {
      onError: handleError,
    }
  );

  if (isError) {
    return <>{loginErrorMsg}</>;
  }
  return <>{JSON.stringify(data)}</>;
};

export default ErrorHandleExample;
