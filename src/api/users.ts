import axios from '@api/core';

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

export const fetchPostLogin = (signUpForm: SignUpForm) =>
  axios.post('/users', { signUpForm });

export const fetchPostSignUp = (signUpForm: SignUpForm) =>
  axios.post('/users', { signUpForm });
