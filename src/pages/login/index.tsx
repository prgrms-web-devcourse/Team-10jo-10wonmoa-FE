import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import { CoinIcon, SubTitle } from '@components';
import { User } from '@models';

const Login = () => {
  const submitHandler = (loginData: User) => {
    // TODO: API 연결
    console.log(loginData);
  };

  return (
    <>
      <SubTitle>로그인</SubTitle>
      <CoinIcon />
      <LoginForm submitHandler={submitHandler} buttonTitle="로그인하기" />
      <Button>구글로 로그인</Button>

      <LoginDescription>
        <p>오늘 처음이신가요?</p>
        <Link to={'/signUp'}>회원가입하기</Link>
      </LoginDescription>
    </>
  );
};

export default Login;

/*
 * TODO: Base Componenet 추가 되면, Styled 코드 컨버팅 후 제거
 */
const Button = styled.button`
  width: 100%;
  outline: none;
  border-radius: 3px;
  border: none;
`;

const LoginDescription = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
