import React from 'react';
import { TopNavBar, CoinIcon } from '@components';
import { Title, TitleSection, SignUpForm } from '@components/auth';
import type { NewUser } from '@types';
import useSignUp from '@hooks/auth/useSignUp';

const SignUp = () => {
  const signUp = useSignUp();

  const submitHandler = async (newUser: NewUser) => {
    signUp(newUser);
  };

  return (
    <>
      <TopNavBar isActiveGoBack={true} />
      <CoinIcon />
      <TitleSection>
        <Title text="회원가입" />
      </TitleSection>
      <SignUpForm submitHandler={submitHandler} />
    </>
  );
};

export default SignUp;
