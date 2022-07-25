import React from 'react';
import styled from '@emotion/styled';

const SignUp = () => {
  const handleSubmit = () => {
    console.log('');
  };
  return (
    <Wrapper>
      <Text>회원가입</Text>
      <CardForm onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="이메일" required={true} />
        <Input
          type="text"
          name="fullName"
          placeholder="닉네임"
          required={true}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          required={true}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          required={true}
        />

        <ButtonWrapper>
          <Button type="submit">회원가입</Button>
        </ButtonWrapper>
      </CardForm>
    </Wrapper>
  );
};

export default SignUp;

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
