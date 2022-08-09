import React from 'react';

import { Button, Input } from '@components';
import { AuthFormWrapper } from '@components/auth';
import { useForm } from '@hooks';
import type { LoginUser } from '@types';

interface LoginFormProps {
  submitHandler: (data: LoginUser) => void;
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
      <Button sizeType="large">로그인하기</Button>
    </AuthFormWrapper>
  );
};

export default LoginForm;
