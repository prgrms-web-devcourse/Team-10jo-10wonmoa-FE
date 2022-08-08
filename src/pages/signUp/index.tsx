import React from 'react';
import SignUpForm from './components/SignUpForm';
import { LoginLayout } from '@components';
import type { NewUser } from '@types';
import useSignUp from '@hooks/auth/useSignUp';

const SignUp = () => {
  const sigUp = useSignUp();

  const submitHandler = async (newUser: NewUser) => {
    sigUp(newUser);
  };

  return (
    <LoginLayout title="회원가입" isActiveGoBack={true}>
      <SignUpForm submitHandler={submitHandler} buttonTitle="회원가입하기" />
    </LoginLayout>
  );
};

export default SignUp;
