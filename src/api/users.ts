import axios from '@api/core';

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

const fetchPostSignUp = (signUpForm: SignUpForm) =>
  axios.post('/users', { signUpForm });

export default fetchPostSignUp;
