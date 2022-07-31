import React from 'react';
import styled from '@emotion/styled';
import { AccountBookDailySum, AccountBookDailyItem } from '@components/account';
import type { SingleAccount } from '@pages/accountBookDaily';

interface SingleAccountProp {
  items: {
    registerDate: string;
    dayIncome: number;
    dayExpenditure: number;
    dayDetails: SingleAccount[];
  };
}

const AccountBookDailyCard: React.FC<SingleAccountProp> = (props) => {
  const dailySum = {
    registerDate: props.items.registerDate.toString(),
    dayIncome: props.items.dayIncome,
    dayExpenditure: props.items.dayExpenditure,
  };

  return (
    <Container>
      <AccountBookDailySum dailySum={dailySum} />
      {props.items.dayDetails.map((item) => (
        <AccountBookDailyItem key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default AccountBookDailyCard;

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  height: 15rem;
  box-shadow: 0px 8px 13px rgba(185, 89, 0, 0.15);
  border-radius: 5px;
`;
