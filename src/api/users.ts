import { request, authRequest } from '@api/core';

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

export const fetchPostLogin = (signUpForm: SignUpForm) =>
  request().post('/users', { signUpForm });

export const fetchPostSignUp = (signUpForm: SignUpForm) =>
  request().post('/users', { signUpForm });

export const fetchGetUser = () =>
  authRequest().get<{ email: string }>('/users');

export const fetchGetLogout = () => authRequest().get('/users/logout');

export const fetchDeleteUser = () => authRequest().delete('/users/out');
