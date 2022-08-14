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
          <Progress
            percent={percent > 100 ? 100 : percent}
            isOverBudget={amount - expenditure < 0}
          >
            <Percent percent={percent}>
              {percent > 100 ? 100 : percent}%
            </Percent>
          </Progress>
        </ProgressBar>
        <ProgressBarBottom>
          <span>예산 {currencyFormatter(amount, true)}</span>
          <span>
            남은 예산{' '}
            {currencyFormatter(
              amount < expenditure ? 0 : amount - expenditure,
              true
            )}
          </span>
        </ProgressBarBottom>
      </BudgetRightInnerContainer>
    </BudgetItemContainer>
  );
};

const BudgetItemContainer = styled.li`
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
  font-size: ${({ theme }) => theme.$font_xs};
  font-weight: lighter;
  color: ${(props) => props.theme.$gray_medium};
`;

const BudgetExpenditure = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.$font_xxs};
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

const Percent = styled.span<{ percent: number }>`
  position: absolute;
  left: 10px;
  top: 2px;
  color: ${({ percent, theme }) => (percent > 5 ? theme.$white : theme.$black)};
`;

const ProgressBarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  span {
    font-weight: lighter;
  }
`;

export default BudgetItem;
