import React from 'react';

type SingleAccount = {
  id: string;
  type: unknown;
  registerDate: string;
  amount: number;
  content: string;
  categoryName: string;
};

interface AccountBookDailyItemProps {
  item: SingleAccount;
}

const AccountBookDailyItem: React.FC<AccountBookDailyItemProps> = (props) => {
  return <>{props.item.amount}</>;
};

export default AccountBookDailyItem;
