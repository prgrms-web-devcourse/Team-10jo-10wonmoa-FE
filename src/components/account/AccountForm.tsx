import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@components';
import { CategoryBox } from '@components/account';
import { useClickAway } from '@hooks';
import { theme } from '@styles';
import type { Category, CreateAccountForm } from '@models';
import { amountToNumberFormatter, currencyFormatter } from '@utils/formatter';

interface AccountFormProps {
  onSubmit: () => void;
  onChangeForm: React.Dispatch<React.SetStateAction<CreateAccountForm>>;
  categories: Category[];
  formValues?: CreateAccountForm;
  onDelete?: () => void;
}

const AMOUNT_MIN_LIMIT = 0;
const AMOUNT_MAX_LIMIT = 1000000000000;

const initialErrorForm = {
  amount: '',
  registerDate: '',
  userCategoryId: '',
  content: '',
};

const AccountForm = ({
  onSubmit,
  onChangeForm,
  categories,
  formValues = {
    amount: 0,
    registerDate: '',
    userCategoryId: 0,
    content: '',
  },
  onDelete,
}: AccountFormProps) => {
  const [formErrors, setFormErrors] = useState(initialErrorForm);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const categoryRef = useClickAway(() => setCategoryToggle(false));

  useEffect(() => {
    onChangeForm((prevForm) => ({
      ...prevForm,
      userCategoryId: 0,
    }));
  }, [categories]);

  const isValidAmount = () => {
    return (
      formValues.amount > AMOUNT_MIN_LIMIT &&
      formValues.amount < AMOUNT_MAX_LIMIT
    );
  };

  const isValidCategory = () => {
    return formValues.userCategoryId !== 0;
  };

  const isValidContent = () => {
    return formValues.content === undefined || formValues.content.length <= 50;
  };

  const isValidateAccount = () => {
    if (!isValidAmount()) {
      setFormErrors({
        ...initialErrorForm,
        amount: '금액은 1원 ~ 1조 미만까지 등록 가능합니다.',
      });

      return false;
    }

    if (!isValidCategory()) {
      setFormErrors({
        ...initialErrorForm,
        userCategoryId: '카테고리 선택은 필수입니다',
      });

      return false;
    }

    if (!isValidContent()) {
      setFormErrors({
        ...initialErrorForm,
        content: '내용은 50자 이하만 가능합니다',
      });

      return false;
    }

    return true;
  };

  const getCategoryName = () => {
    if (!categories) {
      return '';
    }

    const selectedCategory = categories.filter(
      (category) => category.id === formValues.userCategoryId
    )[0];

    console.log(selectedCategory);

    return '';
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
    handleChange(e, amountToNumberFormatter(value));
  };

  const handleCategorySelect = (category: Category) => {
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
              value={currencyFormatter(formValues.amount)}
              onChange={handleAmountChange}
            />
            <ErrorMessageContent>{formErrors.amount}</ErrorMessageContent>
          </StyledInputContainer>
          <StyledInputContainer>
            날짜
            <input
              type="datetime-local"
              name="registerDate"
              required
              value={formValues.registerDate}
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
              value={getCategoryName()}
              onClick={() => setCategoryToggle(true)}
            />
            <ErrorMessageContent>
              {formErrors.userCategoryId}
            </ErrorMessageContent>
          </StyledInputContainer>
          <StyledInputContainer>
            내용
            <input type="text" name="content" onChange={handleChange} />
            <ErrorMessageContent>{formErrors.content}</ErrorMessageContent>
          </StyledInputContainer>
        </InputContainer>
        <ButtonContainer>
          {onDelete && (
            <Button buttonType="red" sizeType="large" onClick={onDelete}>
              삭제
            </Button>
          )}
          <Button buttonType="primary" sizeType="large">
            등록
          </Button>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  position: relative;
  margin-top: auto;
  display: flex;
  flex-direction: column;

  & > button {
    margin-top: 1rem;
  }
`;

const ErrorMessageContent = styled.p`
  color: ${theme.$red};
  text-align: center;
`;
