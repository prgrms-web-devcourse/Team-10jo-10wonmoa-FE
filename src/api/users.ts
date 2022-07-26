import { request, authRequest } from '@api/core';

export const fetchPostLogin = async (loginUser: LoginUser): Promise<Token> => {
  const { data } = await request().post('/users/login', loginUser);
  return data;
};

export const fetchPostSignUp = async (signUpUser: SignUpUser) =>
  await request().post('/users', signUpUser);

export const fetchGetUser = () =>
  authRequest().get<{ email: string }>('/users');

export const fetchPostLogout = () => authRequest().post('/users/logout');

export const fetchDeleteUser = () => authRequest().delete('/users/out');

export const fetchPostPasswordCheck = (password: string) =>
  authRequest().post('/users/password/check', { password });
