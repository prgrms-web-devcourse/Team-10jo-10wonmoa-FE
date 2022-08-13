import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Spinner } from '@components';
import tokenStorage from '@utils/storage/TokenStorage';
import { default as toast } from 'react-hot-toast';

const OAuth2RedirectHandler = () => {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParam.get('access-token');
  const refreshToken = searchParam.get('refresh-token');
  const hasToken = accessToken && refreshToken;

  useEffect(() => {
    if (!hasToken) {
      toast.error(`로그인에 실패했습니다. 🥲 \n다시 시도해주세요.`);
      navigate('/login');
      return;
    }

    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(refreshToken);
    navigate('/account-book/daily');
  }, []);

  return <Spinner />;
};

export default OAuth2RedirectHandler;
