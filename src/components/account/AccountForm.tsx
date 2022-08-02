import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@components';
import { CategoryBox } from '@components/account';
import { useFormatAmount, useClickAway } from '@hooks';
import { theme } from '@styles';
import type { Category, CreateAccountForm } from '@models';
import { amountToNumberFormatter } from '@utils/formatter';

const AMOUNT_MIN_LIMIT = 0;
const AMOUNT_MAX_LIMIT = 1000000000000;

interface AccountFormProps {
  onSubmit: () => void;
  onChangeForm: React.Dispatch<React.SetStateAction<CreateAccountForm>>;
  categories: Category[];
}

const initialForm = {
  amount: '',
  registerDate: '',
  userCategoryId: '',
  content: '',
};

const AccountForm = ({
  onSubmit,
  onChangeForm,
  categories,
}: AccountFormProps) => {
  const { formattedAmount, setAmount } = useFormatAmount();
  const [formErrors, setFormErrors] = useState(initialForm);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoryRef = useClickAway(() => setCategoryToggle(false));

  useEffect(() => {
    setSelectedCategory('');
    onChangeForm((prevForm) => ({
      ...prevForm,
      userCategoryId: '',
    }));
  }, [categories]);

  const isValidAmount = () => {
    const currentAmount = amountToNumberFormatter(formattedAmount);
    return currentAmount > AMOUNT_MIN_LIMIT && currentAmount < AMOUNT_MAX_LIMIT;
  };

  const isValidateAccount = () => {
    if (!isValidAmount()) {
      setFormErrors({
        ...initialForm,
        amount: '금액은 1원 ~ 1조 미만까지 등록 가능합니다.',
      });

      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidateAccount()) {
      onSubmit();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    customValue?: string | number
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
    handleChange(e, amountToNumberFormatter(value));
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.name);
    onChangeForm((prevForm) => ({
      ...prevForm,
      userCategoryId: category.id,
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
            <ErrorMsgContent>{formErrors.amount}</ErrorMsgContent>
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

const ErrorMsgContent = styled.p`
  color: ${theme.$red};
  text-align: center;
`;
