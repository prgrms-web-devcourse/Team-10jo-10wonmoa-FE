import React from 'react';
import styled from '@emotion/styled';

import { useForm } from '@hooks';
import { User } from '@models';

interface UserCardFormProps {
  submitHandler: (data: User) => void;
  buttonTitle: string;
}

const UserCardForm: React.FC<UserCardFormProps> = (props) => {
  const { formValues, handleChange } = useForm(new User());

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="비밀번호 확인"
        required={true}
      />
      <ButtonArea>
        <Button>{props.buttonTitle}</Button>
      </ButtonArea>
    </form>
  );
};

export default UserCardForm;

const Input = styled.input`
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

export const ButtonArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: calc(env(safe-area-inset-bottom) + 1rem);
`;

const Button = styled.button`
  width: 100%;
  outline: none;
  border-radius: 3px;
  border: none;
`;
