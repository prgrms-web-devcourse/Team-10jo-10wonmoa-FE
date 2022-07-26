import React from 'react';
import styled from '@emotion/styled';
import { Button, Input } from '@components';
import { AuthFormWrapper } from '@components/auth';
import { useForm } from '@hooks';
import { ReactComponent as GoogleLogin } from '@assets/Icon/GoogleIcon.svg';

const LoginForm = (props: { submitHandler: (data: LoginUser) => void }) => {
  const { formValues, handleChange } = useForm<LoginUser>({
    email: '',
    password: '',
  });
  const loginSSOHandler = () => {
    document.location.href = `${process.env.REACT_APP_AUTH_URL}/google?redirect_uri=${process.env.REACT_APP_OAUTH_REDIRECT}`;
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitHandler(formValues);
  };

  return (
    <AuthFormWrapper onSubmit={submitHandler}>
      <Input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="이메일 주소"
        autoComplete="off"
        required={true}
      />
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="비밀번호"
        required={true}
      />
      <Button sizeType="large" type="submit">
        로그인하기
      </Button>
      <Button sizeType="large" buttonType="white" onClick={loginSSOHandler}>
        <StyledGoogleLogin>
          <GoogleLogin width={30} />
          <span>구글로 로그인하기</span>
        </StyledGoogleLogin>
      </Button>
    </AuthFormWrapper>
  );
};

export default LoginForm;

const StyledGoogleLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 0.3rem;
  }
`;
