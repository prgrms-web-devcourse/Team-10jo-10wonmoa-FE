import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Input, Button } from '@components';
import { useForm } from '@hooks';
import { User } from '@models';

interface SignUpFormProps {
  submitHandler: (data: User) => void;
  buttonTitle: string;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { formValues, handleChange } = useForm(new User());
  const [errors, setErrors] = useState({ password: '', passwordConfirm: '' });

  const isValidPasswordLength =
    formValues.password.length < 8 || formValues.password.length < 20;
  const isConfirmedPassword =
    formValues.password !== formValues.passwordConfirm;

  const validateSignUp = () => {
    if (isValidPasswordLength) {
      setErrors({
        password: '비밀번호는 8~20자 사이만 가능합니다.',
        passwordConfirm: '',
      });
    }
    if (isConfirmedPassword) {
      setErrors({
        password: '',
        passwordConfirm: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateSignUp();

    // TODO: formValues(입력)에 대한 validation
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
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="닉네임"
        required={true}
      />
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="비밀번호"
        required={true}
      />
      {errors.password}
      <Input
        type="password"
        name="passwordConfirm"
        onChange={handleChange}
        placeholder="비밀번호 확인"
        required={true}
      />
      {errors.passwordConfirm}
      <ButtonArea>
        <Button sizeType="large">{props.buttonTitle}</Button>
      </ButtonArea>
    </form>
  );
};

export default SignUpForm;

export const ButtonArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: calc(env(safe-area-inset-bottom) + 1rem);
`;
