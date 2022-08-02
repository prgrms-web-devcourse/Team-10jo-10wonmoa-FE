import { AxiosResponse } from 'axios';
import axiosInstance from '@api/core';
import tokenStorage from '@utils/storage/TokenStorage';
import type { NewUser, LoginUser, Token } from '@types';

const fetchSignUp = async (newUser: NewUser): Promise<void> => {
  return axiosInstance.post('/users', newUser);
};

const fetchLogIn = async (loginUser: LoginUser): Promise<Token> => {
  const { data }: AxiosResponse<Token> = await axiosInstance.post(
    '/users/login',
    loginUser
  );
  return data;
};

const useAuth = () => {
  const signUp = async (newUser: NewUser): Promise<void> => {
    await fetchSignUp(newUser);
  };

  const logIn = async (loginUser: LoginUser): Promise<void> => {
    const token = await fetchLogIn(loginUser);
    tokenStorage.setAccessToken(token.accessToken);
    tokenStorage.setRefreshToken(token.refreshToken);
  };

  return {
    signUp,
    logIn,
  };
};

export default useAuth;
