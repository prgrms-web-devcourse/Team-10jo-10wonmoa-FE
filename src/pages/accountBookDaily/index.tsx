import React from 'react';

import { AccountBookDailyCard } from '@components/account';

const ACCOUNT_TYPE = {
  INCOME: 'INCOME',
  EXPENDITURE: 'EXPENDITURE',
} as const;

export type SingleAccount = {
  id: string;
  type: 'INCOME' | 'EXPENDITURE';
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
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '222',
            type: ACCOUNT_TYPE.EXPENDITURE,
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
            id: '333',
            type: ACCOUNT_TYPE.INCOME,
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
      {results.map((item, idx) => (
        <AccountBookDailyCard key={idx} items={item} />
      ))}
    </>
  );
};

export default AccountBookDaily;
