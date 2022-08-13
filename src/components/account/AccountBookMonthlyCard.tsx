import React from 'react';
import styled from '@emotion/styled';
import { currencyFormatter } from '@utils/formatter';
import { Divider } from '@components';
const AccountBookMonthlyCard = <T extends { item: MonthlyAccount }>(
  props: T
) => {
  return (
    <Card>
      <div>{props.item.month}월</div>
      <div>
        <span>{currencyFormatter(props.item.incomeSum)}원</span>
        <span>{currencyFormatter(props.item.expenditureSum)}원</span>
        <Divider thick={2} />
        <strong>{currencyFormatter(props.item.totalSum)}원</strong>
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
  border-bottom: 1px solid ${(props) => props.theme.$gray_light};
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  & span:nth-of-type(1) {
    color: ${(props) => props.theme.$blue};
  }
  & span:nth-of-type(2) {
    color: ${(props) => props.theme.$red};
  }
  & strong:nth-of-type(1) {
    font-size: 1.2rem;
  }
`;
