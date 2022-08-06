import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp } from 'react-feather';

const SearchForm = () => {
  const [searchOptionToggle, setSearchOptionToggle] = useState(false);

  const handleToggleButton = () => {
    setSearchOptionToggle((prevState) => !prevState);
  };

  return (
    <>
      <SearchFormContainer>
        <SearchInputContainer>
          <label htmlFor="searchForm-searchInput">검색</label>
          <StyledInput id="searchForm-searchInput" type="search" />
        </SearchInputContainer>
        {searchOptionToggle && (
          <>
            <StyledInputContainer>
              분류
              <StyledInput type="text" name="userCategoryId" readOnly />
            </StyledInputContainer>
            <StyledInputContainer>
              금액
              <StyledInput
                type="text"
                name="minAmount"
                placeholder="최소"
                title="최소 금액"
              />
              ~
              <StyledInput
                type="text"
                name="maxAmount"
                placeholder="최대"
                title="최대 금액"
              />
            </StyledInputContainer>
          </>
        )}
      </SearchFormContainer>
      <SearchOptionToggleContainer>
        <button onClick={handleToggleButton}>
          {searchOptionToggle ? <ChevronUp /> : <ChevronDown />}
        </button>
      </SearchOptionToggleContainer>
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

  & > input {
    background-color: ${(props) => props.theme.$gray_accent};
    border-radius: 0.5rem;
    border-bottom: 0;
    margin: 0;
    padding: 0.5rem 0.8rem;
    height: 2.4rem;
    font-size: 1.2rem;
    &:focus {
      border-bottom: 0;
    }
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
  &:focus {
    border-bottom: 0.1rem solid ${(props) => props.theme.$primary};
  }
`;

const SearchOptionToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  & > button {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme.$gray_dark};
    cursor: pointer;
  }
`;
