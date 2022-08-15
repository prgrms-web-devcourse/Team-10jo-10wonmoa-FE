import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@components';
import { CategoryModal } from '@components/search';
import type { Category, AccountDetailResponse, TabItem } from '@types';
import { amountToNumberFormatter, currencyFormatter } from '@utils/formatter';

interface AccountFormProps {
  onSubmit: () => void;
  onChangeForm: React.Dispatch<React.SetStateAction<AccountDetailResponse>>;
  formValues: AccountDetailResponse;
  onDelete?: (e: React.FormEvent<HTMLButtonElement>) => void;
  accountType?: TabItem;
}
const AMOUNT_MIN_LIMIT = 0;
const AMOUNT_MAX_LIMIT = 1000000000000;
const CONTENT_MAX_LIMIT = 50;

const initialErrorForm: Record<string, string> = {
  amount: '',
  registerDate: '',
  userCategoryId: '',
  content: '',
};

const AccountForm = ({
  onSubmit,
  onChangeForm,
  formValues,
  onDelete,
  accountType,
}: AccountFormProps) => {
  const [formErrors, setFormErrors] = useState(initialErrorForm);
  const [categoryToggle, setCategoryToggle] = useState(false);

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
    return (
      formValues.content == null ||
      formValues.content.length <= CONTENT_MAX_LIMIT
    );
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

    if (name in formErrors && formErrors[name].length !== 0) {
      setFormErrors((prevError) => ({
        ...prevError,
        [name]: '',
      }));
    }

    onChangeForm((prevForm) => ({
      ...prevForm,
      [name]: customValue ?? value,
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e, amountToNumberFormatter(value));
  };

  const handleCategorySelect = (selectedCategories: Category[]) => {
    if (selectedCategories.length === 0) {
      return;
    }

    const selectCategory = selectedCategories[0];

    onChangeForm((prevForm) => ({
      ...prevForm,
      userCategoryId: selectCategory.id,
      categoryName: selectCategory.name,
    }));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputContainer>
          <div>
            <StyledInput>
              금액
              <input
                type="text"
                name="amount"
                required
                value={currencyFormatter(formValues.amount)}
                onChange={handleAmountChange}
              />
            </StyledInput>
            <ErrorMessageContent>{formErrors.amount}</ErrorMessageContent>
          </div>
          <div>
            <StyledInput>
              날짜
              <input
                type="datetime-local"
                name="registerDate"
                required
                value={formValues.registerDate}
                onChange={handleChange}
              />
            </StyledInput>
          </div>
          <div>
            <StyledInput>
              분류
              <input
                type="text"
                name="userCategoryId"
                readOnly
                required
                value={formValues.categoryName}
                onClick={() => setCategoryToggle(true)}
              />
            </StyledInput>
            <ErrorMessageContent>
              {formErrors.userCategoryId}
            </ErrorMessageContent>
          </div>
          <div>
            <StyledInput>
              내용
              <input
                type="text"
                name="content"
                value={formValues.content ?? ''}
                onChange={handleChange}
              />
            </StyledInput>
            <ErrorMessageContent>{formErrors.content}</ErrorMessageContent>
          </div>
        </InputContainer>
        <ButtonContainer>
          {onDelete && (
            <Button buttonType="red" sizeType="large" onClick={onDelete}>
              삭제
            </Button>
          )}
          <Button buttonType="primary" sizeType="large" type="submit">
            등록
          </Button>
        </ButtonContainer>
      </StyledForm>
      <CategoryModal
        visible={categoryToggle}
        type="radio"
        onClose={() => setCategoryToggle(false)}
        onSubmit={handleCategorySelect}
        parentAccountType={accountType}
      />
    </>
  );
};

export default AccountForm;

const StyledForm = styled.form`
  width: 100%;
  padding: 1rem 1.5rem;
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
  width: 100%;
`;

const StyledInput = styled.label`
  color: ${(props) => props.theme.$gray_dark};
  word-break: keep-all;
  display: flex;

  & > input {
    width: 100%;
    height: 2rem;
    border: 0;
    border-bottom: 0.1rem solid ${(props) => props.theme.$gray_medium};
    box-sizing: border-box;
    outline: none;
    padding: 0.5rem;
    font-size: 1.1rem;
    margin: 0 0.5rem;

    &:focus {
      border-bottom: 0.1rem solid ${(props) => props.theme.$primary};
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

const ErrorMessageContent = styled.span`
  display: block;
  color: ${(props) => props.theme.$red};
  text-align: center;
`;
