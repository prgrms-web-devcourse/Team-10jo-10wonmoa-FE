import React from 'react';
import styled from '@emotion/styled';

import { Button, Input } from '@components';
import { useForm } from '@hooks';
import type { LoginUser } from '@types';

interface LoginFormProps {
  submitHandler: (data: LoginUser) => void;
  buttonTitle: string;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { formValues, handleChange } = useForm<LoginUser>({
    email: '',
    password: '',
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitHandler(formValues);
  };

  return (
    <form onSubmit={submitHandler}>
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
      <ButtonArea>
        <Button sizeType="large">{props.buttonTitle}</Button>
      </ButtonArea>
    </form>
  );
};

export default LoginForm;

export const ButtonArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: calc(env(safe-area-inset-bottom) + 1rem);
`;
