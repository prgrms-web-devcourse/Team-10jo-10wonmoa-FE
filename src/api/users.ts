import { request, authRequest } from '@api/core';
import type { LoginUser, NewUser, Token } from '@types';

export const fetchPostLogin = async (loginUser: LoginUser): Promise<Token> => {
  const { data } = await request().post('/users', loginUser);
  return data;
};

export const fetchPostSignUp = async (NewUser: NewUser) =>
  await request().post('/users', NewUser);

export const fetchGetUser = () =>
  authRequest().get<{ email: string }>('/users');

export const fetchGetLogout = () => authRequest().get('/users/logout');

export const fetchDeleteUser = () => authRequest().delete('/users/out');
