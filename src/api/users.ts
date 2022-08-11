import { axiosInstance, axiosAuthInstance } from '@api/core';

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

export const fetchPostLogin = (signUpForm: SignUpForm) =>
  axiosInstance.post('/users', { signUpForm });

export const fetchPostSignUp = (signUpForm: SignUpForm) =>
  axiosInstance.post('/users', { signUpForm });

export const fetchGetUser = () =>
  axiosAuthInstance.get<{ email: string }>('/users');

export const fetchGetLogout = () => axiosAuthInstance.get('/users/logout');

export const fetchDeleteUser = () => axiosAuthInstance.delete('/users/out');
