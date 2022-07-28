import React from 'react';
import styled from '@emotion/styled';
import { Button, Input } from '@components';
import { useForm, useFormatAmount } from '@hooks';

interface AccountFormProps {
  accountType: string;
}

const AccountForm = ({ accountType }: AccountFormProps) => {
  const { formValues, handleChange } = useForm({});
  const { originAmount, formattedAmount, setAmount } = useFormatAmount();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(accountType, formValues);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(value);
    handleChange(e, originAmount.current);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            name="amount"
            labelText="금액"
            value={formattedAmount}
            onChange={handleAmountChange}
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
        </InputContainer>
        <Button buttonType="primary" sizeType="large">
          등록
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
  align-items: center;
  flex-grow: 1;

  & > button {
    position: relative;
    margin-top: auto;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 0.7;
`;
