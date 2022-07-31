import React from 'react';
import styled from '@emotion/styled';

import { AccountBookDailyCard } from '@components/account';
import { RoundButton } from '@components';

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
            id: '111',
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '111',
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
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
    <CardArea>
      {results.map((item, idx) => (
        <AccountBookDailyCard key={idx} items={item} />
      ))}
      <RoundButton />
    </CardArea>
  );
};

export default AccountBookDaily;

const CardArea = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 0%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  row-gap: 1rem;
  margin-bottom: 7rem;
  &:hover::-webkit-scrollbar {
    height: 0.7rem;
  }

  &:hover::-webkit-scrollbar-track {
    background-color: white;
  }

  &:hover::-webkit-scrollbar-thumb {
    border-width: 0.3rem;
    border-radius: 1.2rem;
    background-color: lightgray;
  }
`;

const FixedButton = styled.div`
  position: fixed;
  bottom: 10rem;
  right: 1rem;
`;
