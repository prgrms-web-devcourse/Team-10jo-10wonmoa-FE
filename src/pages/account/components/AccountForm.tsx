import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@components';
import { useFormatAmount, useClickAway } from '@hooks';
import CategoryBox, { Category } from './CategoryBox';
import { theme } from '@styles';
import type { CreateAccountForm } from '@api';

interface AccountFormProps {
  onSubmit: () => void;
  onChangeForm: React.Dispatch<React.SetStateAction<CreateAccountForm>>;
  categories: Category[];
}

const AccountForm = ({
  onSubmit,
  onChangeForm,
  categories,
}: AccountFormProps) => {
  const { originAmount, formattedAmount, setAmount } = useFormatAmount();
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoryRef = useClickAway(() => setCategoryToggle(false));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    customValue?: string
  ) => {
    const { name, value } = e.target;
    onChangeForm((prevForm) => ({
      ...prevForm,
      [name]: customValue ?? value,
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(value);
    handleChange(e, originAmount.current);
  };

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    onChangeForm((prevForm) => ({
      ...prevForm,
      userCategoryId: value,
    }));
    setCategoryToggle(false);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <StyledInputContainer>
            금액
            <input
              type="text"
              name="amount"
              required
              value={formattedAmount}
              onChange={handleAmountChange}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            날짜
            <input
              type="datetime-local"
              name="registerDate"
              required
              onChange={handleChange}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            분류
            <input
              type="text"
              name="userCategoryId"
              readOnly
              required
              value={selectedCategory}
              onClick={() => setCategoryToggle(true)}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            내용
            <input type="text" name="content" onChange={handleChange} />
          </StyledInputContainer>
        </InputContainer>
        <Button buttonType="primary" sizeType="large">
          등록
        </Button>
      </StyledForm>
      {categoryToggle && (
        <CategoryBox
          CategoryList={categories}
          categoryRef={categoryRef}
          onClose={() => setCategoryToggle(false)}
          onSelect={handleCategorySelect}
        />
      )}
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

const StyledInputContainer = styled.label`
  color: ${theme.$gray_dark};
  & > input {
    width: 20rem;
    height: 2.5rem;
    border: 0;
    border-bottom: 0.1rem solid #afb1b6;
    box-sizing: border-box;
    outline: none;
    margin-left: 1rem;
    padding: 0.5rem;
    font-size: 1.1rem;
    &:focus {
      border-bottom: 0.1rem solid ${theme.$primary};
    }
  }
`;
