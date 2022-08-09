import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { TopNavBar, CoinIcon, Divider } from '@components';
import { Title, SubTitle, TitleSection, LoginForm } from '@components/auth';
import { LoginUser } from '@types';
import useLogin from '@hooks/auth/useLogin';

const Login = () => {
  const login = useLogin();

  const submitHandler = (loginUser: LoginUser) => {
    login(loginUser);
  };

  return (
    <>
      <TopNavBar />
      <CoinIcon />
      <TitleSection>
        <Title text="로그인" />
        <SubTitle text="편리하게 돈을 관리해보세요." />
      </TitleSection>
      <LoginForm submitHandler={submitHandler} />
      <Divider size={20} />
      <SignUpLink>
        오늘 처음이신가요? <Link to={'/signUp'}>회원가입하기</Link>
      </SignUpLink>
    </>
  );
};

export default Login;

const SignUpLink = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  > a {
    color: ${(props) => props.theme.$primary};
    font-weight: 600;
  }
`;
