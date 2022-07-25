import React from 'react';
import styled from '@emotion/styled';

const Login = () => {
  return (
    <Wrapper>
      <Text>로그인</Text>
      <CardForm>
        <Input
          type="email"
          name="email"
          placeholder="이메일 주소"
          autoComplete={'off'}
          required={true}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          required={true}
        />
        <Button type="submit">로그인</Button>
      </CardForm>
    </Wrapper>
  );
};

export default Login;

const Text = styled.p`
  font-size: 1rem;
`;

const Button = styled.button`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  font-size: 2rem;
  padding: 0.8rem 0.8rem;
  background-color: yellow;
  outline: none;
  text-align: center;
  border-radius: 0.8rem;
  color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0 0.2rem 0.2rem #919191;

  &:hover {
    background-color: darkgreen;
    color: white;
    border: transparent;
  }

  &:active {
    background-color: #0070ee;
    color: white;
    border: transparent;
  }

  &:disabled {
    background-color: #919191;
    cursor: default;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 2.2rem;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  padding: 1.5rem;
  margin: 0;
  border: none;
  outline: none;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 1.1rem;
  background-color: #f8f9fa;
`;

export const CardForm = styled.form`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 1rem;
  align-items: center;
  margin-top: 2rem;
`;
