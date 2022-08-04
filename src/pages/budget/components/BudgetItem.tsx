import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

export interface BudgetItemProps {
  category: string;
  budget: number;
  expenditure: number;
  percent: number;
}

const BudgetItem: React.FC<BudgetItemProps> = ({
  category,
  budget,
  expenditure,
  percent,
}) => {
  if (!budget) {
    return (
      <BudgetItemContainer>
        <div>{category}</div>
        <div>{currencyFormatter(expenditure)}</div>
      </BudgetItemContainer>
    );
  }

  return (
    <BudgetItemContainer>
      <BudgetLeftInnerContainer>
        <BudgetCategory>{category}</BudgetCategory>
        <BudgetExpenditure>
          {currencyFormatter(expenditure)}원
        </BudgetExpenditure>
      </BudgetLeftInnerContainer>
      <BudgetRightInnerContainer>
        <ProgressBar>
          <Percent>{percent}%</Percent>
          <Progress percent={percent} isOverBudget={budget - expenditure < 0} />
        </ProgressBar>
        <ProgressBarBottom>
          <span>{currencyFormatter(expenditure)}</span>
          <span>{currencyFormatter(budget - expenditure)}</span>
        </ProgressBarBottom>
      </BudgetRightInnerContainer>
    </BudgetItemContainer>
  );
};

const BudgetItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  border: 1px solid ${(props) => props.theme.$gray_medium};
  & + & {
    border-top: none;
  }
`;

const BudgetLeftInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 1rem 0rem;
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

type Progress = {
  percent: number;
  isOverBudget: boolean;
};

const Progress = styled.div<Progress>`
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
`;

const ProgressBarBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default BudgetItem;
