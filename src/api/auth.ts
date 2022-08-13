import { authRequest } from '@api/core';
import tokenStorage from '@utils/storage/TokenStorage';

export const fetchAccessToken = async () => {
  const token = {
    accessToken: tokenStorage.getAccessToken(),
    refreshToken: tokenStorage.getRefreshToken(),
  };
  const { data } = await authRequest().post('/users/refresh', token);
  return data;
};
