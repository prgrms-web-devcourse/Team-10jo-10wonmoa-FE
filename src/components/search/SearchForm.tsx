import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp, Search } from 'react-feather';
import { Category, CreateSearchRequest } from '@types';
import { amountToNumberFormatter, currencyFormatter } from '@utils/formatter';
import CategoryModal from './CategoryModal';

interface SearchFormProps {
  onSubmit: (formValues: CreateSearchRequest) => void;
}

const initialFormValue = {
  content: '',
  categories: [],
  categoryNames: '',
  minprice: 0,
  maxprice: 0,
  start: '',
  end: '',
};

const initialErrorForm: Record<string, string> = {
  price: '',
  date: '',
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [searchOptionToggle, setSearchOptionToggle] = useState(false);
  const [formValues, setFormValues] =
    useState<Required<CreateSearchRequest>>(initialFormValue);
  const [formErrors, setFormErrors] = useState(initialErrorForm);
  const [categoryModalToggle, setCategoryModalToggle] = useState(false);

  const amountFormatter = (amount: number) => {
    return amount === 0 ? '' : currencyFormatter(amount);
  };

  const handleToggleButton = () => {
    setSearchOptionToggle((prevState) => !prevState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    customValue?: string | number
  ) => {
    const { name, value } = e.target;

    setFormErrors(initialErrorForm);

    setFormValues((prevForm) => ({
      ...prevForm,
      [name]: customValue ?? value,
    }));
  };

  const isValidDate = () => {
    if (
      formValues.start !== '' &&
      formValues.end !== '' &&
      new Date(formValues.start) > new Date(formValues.end)
    ) {
      return false;
    }
    return true;
  };

  const isValidPrice = () => {
    if (
      formValues.minprice !== 0 &&
      formValues.maxprice !== 0 &&
      formValues.maxprice < formValues.minprice
    ) {
      return false;
    }
    return true;
  };

  const isValidateSearchForm = () => {
    if (!isValidDate()) {
      setFormErrors({
        ...initialErrorForm,
        date: '시작 날짜는 종료 날짜보다 빨라야 합니다.',
      });
      return false;
    }

    if (!isValidPrice()) {
      setFormErrors({
        ...initialErrorForm,
        date: '최소 금액은 최대 금액보다 낮아야 합니다.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isValidateSearchForm()) {
      onSubmit(formValues);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e, amountToNumberFormatter(value));
  };

  const handleCategoryChange = (selectedCategories: Category[]) => {
    const categoryNames = selectedCategories
      .map((category) => category.name)
      .join(', ');
    const categories = selectedCategories.map((category) => category.id);

    setFormValues((prevForm) => ({
      ...prevForm,
      categoryNames,
      categories,
    }));
  };

  return (
    <>
      <SearchFormContainer>
        <SearchInputContainer>
          <label htmlFor="searchForm-searchInput">검색</label>
          <Search size={20} />
          <StyledInput
            id="searchForm-searchInput"
            type="search"
            name="content"
            value={formValues.content}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            <Search size={20} />
          </button>
        </SearchInputContainer>
        {searchOptionToggle && (
          <>
            <StyledInputContainer>
              분류
              <StyledInput
                type="text"
                name="categories"
                value={formValues.categoryNames}
                onClick={() => setCategoryModalToggle(true)}
                readOnly
              />
            </StyledInputContainer>
            <div>
              <StyledInputContainer>
                금액
                <StyledInput
                  type="text"
                  name="minprice"
                  placeholder="최소"
                  title="최소 금액"
                  value={amountFormatter(formValues.minprice)}
                  onChange={handleAmountChange}
                />
                ~
                <StyledInput
                  type="text"
                  name="maxprice"
                  placeholder="최대"
                  title="최대 금액"
                  value={amountFormatter(formValues.maxprice)}
                  onChange={handleAmountChange}
                />
              </StyledInputContainer>
              <ErrorMessageContent>{formErrors.price}</ErrorMessageContent>
            </div>
            <div>
              <StyledInputContainer>
                기간
                <StyledInput
                  type="date"
                  name="start"
                  title="시작 날짜"
                  value={formValues.start}
                  onChange={handleChange}
                />
                ~
                <StyledInput
                  type="date"
                  name="end"
                  title="종료 날짜"
                  value={formValues.end}
                  onChange={handleChange}
                />
              </StyledInputContainer>
              <ErrorMessageContent>{formErrors.date}</ErrorMessageContent>
            </div>
          </>
        )}
      </SearchFormContainer>
      <SearchOptionToggleContainer>
        <button onClick={handleToggleButton}>
          {searchOptionToggle ? <ChevronUp /> : <ChevronDown />}
        </button>
      </SearchOptionToggleContainer>
      <CategoryModal
        visible={categoryModalToggle}
        onClose={() => setCategoryModalToggle(false)}
        onSubmit={handleCategoryChange}
      />
    </>
  );
};

export default SearchForm;

const SearchFormContainer = styled.form`
  background-color: ${(props) => props.theme.$white};
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 1.5rem;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;

  & > label {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
    display: flex;
    justify-content: center;
  }

  & > svg {
    position: absolute;
    transform: translate(0.4rem, 0.4rem);
  }

  & > input {
    background-color: ${(props) => props.theme.$gray_accent};
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom: 0;
    margin: 0;
    padding: 0.5rem 0.8rem 0.5rem 2.5rem;
    height: 2.4rem;
    font-size: 1.2rem;
    text-align: left;
    &:focus {
      border-bottom: 0;
    }
  }

  & > button {
    background-color: ${(props) => props.theme.$primary};
    border: 0;
    color: ${(props) => props.theme.$white};
    cursor: pointer;
    width: 4rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

const StyledInputContainer = styled.label`
  color: ${(props) => props.theme.$gray_dark};
  display: flex;
  word-break: keep-all;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.3rem 0.5rem;
  font-size: 1.1rem;
  border: 0;
  outline: none;
  box-sizing: border-box;
  margin: 0 0.5rem;
  border-bottom: 0.1rem solid #afb1b6;
  text-align: center;
  text-overflow: ellipsis;
  &:focus {
    border-bottom: 0.1rem solid ${(props) => props.theme.$primary};
  }
  &[type='date'] {
    font-size: 0.9rem;
  }
`;

const SearchOptionToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.$white};

  & > button {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme.$gray_dark};
    cursor: pointer;
  }
`;

const ErrorMessageContent = styled.p`
  color: ${(props) => props.theme.$red};
  text-align: center;
`;
