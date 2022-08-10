import { axiosInstance } from '@api/core';

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

export const fetchPostLogin = (signUpForm: SignUpForm) =>
  axiosInstance.post('/users', { signUpForm });

export const fetchPostSignUp = (signUpForm: SignUpForm) =>
  axiosInstance.post('/users', { signUpForm });
