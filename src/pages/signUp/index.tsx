import React from 'react';
import SignUpForm from './components/SignUpForm';
import { LoginLayout } from '@components';
import { User } from '@models';

const SignUp = () => {
  const submitHandler = (userData: User) => {
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
