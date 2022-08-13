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
          placeholder={inputString}
          value={inputString}
          onInput={handleInput}
          onFocus={handleFocus}
        />
      </BudgetRightInnerContainer>
    </BudgetItemContainer>
  );
};

export default BudgetEditItem;

const Input = styled.input`
  font-size: 1.5rem;
  text-align: right;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const BudgetItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.$white};
`;

const BudgetLeftInnerContainer = styled.div`
  display: flex;
  flex: 1;
`;

const BudgetExpenditure = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const BudgetRightInnerContainer = styled.div`
  flex: 1;
  padding: 0.625rem 0rem;
`;
