import React from 'react';
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
    <>
      <AccountBookDailySum dailySum={dailySum} />
      {props.items.dayDetails.map((item) => (
        <AccountBookDailyItem item={item} />
      ))}
    </>
  );
};

export default AccountBookDailyCard;
