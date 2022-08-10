import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';

const AccountBookMonthlyCard = <T extends { item: MonthlyAccount }>(
  props: T
) => {
  return (
    <Card>
      <div>{props.item.month}월</div>
      <div>
        <p>{currencyFormatter(props.item.incomeSum)}원</p>
        <p>{currencyFormatter(props.item.expenditureSum)}원</p>
        <p>{currencyFormatter(props.item.totalSum)}원</p>
      </div>
    </Card>
  );
};

export default AccountBookMonthlyCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 4rem 2rem;
  margin: 0 1rem;
  border-bottom: 1px solid ${(props) => props.theme.$gray_medium};
  & div:nth-of-type(1) {
    background: #ffc266;
    border-radius: 0.7rem;
    padding: 0.5rem;
    color: ${(props) => props.theme.$white};
    font-size: 1.2rem;
    font-weight: 500;
  }
  & div:nth-of-type(2) {
    text-align: right;
  }
  & p:nth-of-type(1) {
    color: ${(props) => props.theme.$blue};
  }
  & p:nth-of-type(2) {
    color: ${(props) => props.theme.$red};
  }
  & p:nth-of-type(3) {
    margin-top: 1rem;
    font-size: 1.2rem;
    border-top: 1px solid ${(props) => props.theme.$gray_medium};
  }
`;
