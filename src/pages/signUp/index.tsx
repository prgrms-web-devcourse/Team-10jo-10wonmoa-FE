import React from 'react';
import SignUpForm from './components/SignUpForm';
import { LoginLayout } from '@components';
import type { NewUser } from '@types';
import axiosInstance from 'axios';

const SignUp = () => {
  const submitHandler = async (userData: NewUser) => {
    const result = await axiosInstance.post('/users', userData);
    console.log(result);

    // TODO: API 연결
    console.log(userData);
  };

  return (
    <LoginLayout title="회원가입" isActiveGoBack={true}>
      <SignUpForm submitHandler={submitHandler} buttonTitle="회원가입하기" />
    </LoginLayout>
  );
};

export default SignUp;
