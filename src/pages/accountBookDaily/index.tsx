import React from 'react';

import { AccountBookDailyCard } from '@components/account';

export type AccountType = 'INCOME' | 'EXPENDITURE';

export type SingleAccount = {
  id: string;
  type: AccountType | unknown;
  registerDate: string;
  amount: number;
  content: string;
  categoryName: string;
};

const AccountBookDaily: React.FC = () => {
  // API Response
  const data = {
    currentPage: 3,
    nextPage: 4,
    results: [
      {
        registerDate: '2022-07-20T22:11',
        dayIncome: 30000,
        dayExpenditure: 10000,
        dayDetails: [
          {
            id: '111',
            type: 'INCOME',
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '111',
            type: 'INCOME',
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
        ],
      },
      {
        registerDate: '2022-07-20T22:11',
        dayIncome: 30000,
        dayExpenditure: 10000,
        dayDetails: [
          {
            id: '111',
            type: 'INCOME',
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
        ],
      },
    ],
  };

  const { results } = data;

  return (
    <>
      {results.map((item) => (
        <AccountBookDailyCard items={item} />
      ))}
    </>
  );
};

export default AccountBookDaily;
