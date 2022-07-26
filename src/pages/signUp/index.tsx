import React from 'react';
import SignUpForm from './components/SignUpForm';
import { CoinIcon, SubTitle } from '@components';
import { User } from '@models';

const SignUp = () => {
  const submitHandler = (userData: User) => {
    // TODO: API 연결
    console.log(userData);
  };

  return (
    <>
      <SubTitle>회원가입</SubTitle>
      <CoinIcon />
      <SignUpForm submitHandler={submitHandler} buttonTitle="회원가입하기" />
    </>
  );
};

export default SignUp;
