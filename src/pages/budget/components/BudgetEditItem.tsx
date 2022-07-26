import React, { useState } from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';

interface BudgetItemProps {
  categoryName: string;
  amount: number;
  id: number;
  mutateBudget: (amount: number, id: number) => void;
}

const BudgetEditItem = ({
  id,
  categoryName,
  amount,
  mutateBudget,
}: BudgetItemProps) => {
  const [inputString, setInputString] = useState<string>(
    `${currencyFormatter(amount)}`
  );

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const numberValue = Number(value.replaceAll(',', ''));
    if (isNaN(numberValue)) {
      return;
    }
    setInputString(`${currencyFormatter(numberValue)}`);
    mutateBudget(numberValue, id);
  };

  const handleFocus = () => {
    setInputString('');
  };

  return (
    <BudgetItemContainer>
      <BudgetLeftInnerContainer>
        <BudgetExpenditure>{categoryName}</BudgetExpenditure>
      </BudgetLeftInnerContainer>
      <BudgetRightInnerContainer>
        <Input
          value={inputString}
          onInput={handleInput}
          onFocus={handleFocus}
        />
        <span>원</span>
      </BudgetRightInnerContainer>
    </BudgetItemContainer>
  );
};

export default BudgetEditItem;

const Input = styled.input`
  font-size: ${({ theme }) => theme.$font_md};
  text-align: right;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  outline: 0;
  border: 0;
  width: 10rem;
  border-bottom: 2px solid ${({ theme }) => theme.$gray_medium};
  &:focus {
    border-color: ${({ theme }) => theme.$primary};
  }
`;

const BudgetItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  background-color: ${({ theme }) => theme.$white};
  font-size: ${({ theme }) => theme.$font_md};
`;

const BudgetLeftInnerContainer = styled.div`
  display: flex;
`;

const BudgetExpenditure = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.$font_sm};
`;

const BudgetRightInnerContainer = styled.div`
  display: flex;
  span {
    margin-left: 5px;
    font-size: ${({ theme }) => theme.$font_sm};
  }
`;
