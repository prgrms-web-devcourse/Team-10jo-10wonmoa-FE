import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';
import type { Budget } from 'types/budget';

const BudgetItem: React.FC<Budget> = ({
  categoryName,
  amount,
  expenditure,
  percent,
}) => {
  if (!amount) {
    return (
      <BudgetItemContainer>
        <div>{categoryName}</div>
        <div>{currencyFormatter(expenditure)}원</div>
      </BudgetItemContainer>
    );
  }

  return (
    <BudgetItemContainer>
      <BudgetLeftInnerContainer>
        <BudgetCategory>{categoryName}</BudgetCategory>
        <BudgetExpenditure>
          지출 {currencyFormatter(expenditure)}원
        </BudgetExpenditure>
      </BudgetLeftInnerContainer>
      <BudgetRightInnerContainer>
        <ProgressBar>
          <Percent>{percent > 100 ? 100 : percent}%</Percent>
          <Progress
            percent={percent > 100 ? 100 : percent}
            isOverBudget={amount - expenditure < 0}
          />
        </ProgressBar>
        <ProgressBarBottom>
          <span> 예산 {currencyFormatter(amount)}원</span>
          <span>
            남은 예산{' '}
            {currencyFormatter(amount < expenditure ? 0 : amount - expenditure)}
            원
          </span>
        </ProgressBarBottom>
      </BudgetRightInnerContainer>
    </BudgetItemContainer>
  );
};

const BudgetItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & + & {
    border-top: none;
  }
`;

const BudgetLeftInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const BudgetCategory = styled.span`
  color: ${(props) => props.theme.$gray_medium};
`;

const BudgetExpenditure = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const BudgetRightInnerContainer = styled.div`
  flex: 2;
  padding: 0.625rem 0rem;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;

  height: 1.75rem;
  background-color: ${(props) => props.theme.$gray_light};
`;

const Progress = styled.div<{ percent: number; isOverBudget: boolean }>`
  border-radius: inherit;
  width: ${(props) => props.percent}%;
  height: 100%;
  font-size: 1.25rem;
  background-color: ${(props) =>
    props.isOverBudget ? props.theme.$red : props.theme.$blue};
`;

const Percent = styled.span`
  position: absolute;
  right: 5px;
  top: 2px;
  color: ${({ theme }) => theme.$white};
`;

const ProgressBarBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default BudgetItem;
