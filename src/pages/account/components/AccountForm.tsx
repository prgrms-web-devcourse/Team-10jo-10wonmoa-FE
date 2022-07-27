import React from 'react';
import styled from '@emotion/styled';
import { Button, Input } from '@components';
import { useForm } from '@hooks';

interface AccountFormProps {
  // accountType: 'incomes' | 'expenditures';
  accountType: string;
}

const AccountForm = ({ accountType }: AccountFormProps) => {
  const { formValues, handleChange } = useForm({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(accountType, formValues);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="amount"
          labelText="금액"
          onChange={handleChange}
        />
        <Input
          type="date"
          name="registerDate"
          labelText="날짜"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="userCategoryId"
          labelText="분류"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="content"
          labelText="내용"
          onChange={handleChange}
          required={false}
        />
        <Button buttonType="primary" sizeType="large">
          저장하기
        </Button>
      </StyledForm>
    </>
  );
};

export default AccountForm;

const StyledForm = styled.form`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
`;
