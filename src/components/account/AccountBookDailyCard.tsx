import React from 'react';
import styled from '@emotion/styled';
import { AccountBookDailySum, AccountBookDailyItem } from '@components/account';

const AccountBookDailyCard = <T extends { items: DailyAccount }>(props: T) => {
  return (
    <Container>
      <AccountBookDailySum
        dayIncome={props.items.incomeSum}
        dayExpenditure={props.items.expenditureSum}
        registerDate={props.items.registerDate}
      />
      {props.items.dayDetails.map((item, idx) => (
        <AccountBookDailyItem
          key={`account-single-${item.id}-${item.type}-${idx}`}
          item={item}
        />
      ))}
    </Container>
  );
};

export default AccountBookDailyCard;

const Container = styled.div`
  width: 100%;
  box-shadow: 0px 8px 13px rgba(185, 89, 0, 0.15);
  border-radius: 5px;
  padding-bottom: 2.4rem;
`;
