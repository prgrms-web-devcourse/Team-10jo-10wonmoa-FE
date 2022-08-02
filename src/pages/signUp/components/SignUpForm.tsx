import React from 'react';
import styled from '@emotion/styled';

import { Input, Button } from '@components';
import { useForm } from '@hooks';
import { NewUser } from '@types';

interface SignUpFormProps {
  submitHandler: (data: NewUser) => void;
  buttonTitle: string;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { formValues, handleChange } = useForm<NewUser>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const isValidPasswordLength =
    formValues.password.length >= 8 && formValues.password.length < 20;

  const isConfirmedPassword =
    formValues.password === formValues.passwordConfirm;

  const isAllFilled = Object.values(formValues).every((v) => v);

  const isValidValues = isValidPasswordLength && isConfirmedPassword;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitHandler(formValues);
  };

  return (
    <form onSubmit={submitHandler}>
      {!!isValidPasswordLength.toString()}
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
      {formValues.password &&
        !isValidPasswordLength &&
        '비밀번호는 8~20자 사이만 가능합니다.'}
      <Input
        type="password"
        name="passwordConfirm"
        onChange={handleChange}
        placeholder="비밀번호 확인"
        required={true}
      />
      {formValues.passwordConfirm &&
        !isConfirmedPassword &&
        '비밀번호가 일치하지 않습니다.'}
      <ButtonArea>
        <Button sizeType="large" isDisabled={!isValidValues || !isAllFilled}>
          {props.buttonTitle}
        </Button>
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
