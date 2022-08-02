import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import { LoginLayout } from '@components';
import type { NewUser } from '@types';
import useAuth from '@hooks/auth/useAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const submitHandler = async (newUser: NewUser) => {
    await signUp(newUser);
    navigate('/login');
  };

  return (
    <LoginLayout title="회원가입" isActiveGoBack={true}>
      <SignUpForm submitHandler={submitHandler} buttonTitle="회원가입하기" />
    </LoginLayout>
  );
};

export default SignUp;
