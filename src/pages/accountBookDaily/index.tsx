import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { AccountBookDailyCard, PlusButton } from '@components/account';
import { GoTopButton } from '@components';
import instance from '../../api/core';

const ACCOUNT_TYPE = {
  INCOME: 'INCOME',
  EXPENDITURE: 'EXPENDITURE',
} as const;

export type SingleAccount = {
  id: string;
  type: typeof ACCOUNT_TYPE[keyof typeof ACCOUNT_TYPE];
  registerDate: string;
  amount: number;
  content: string;
  categoryName: string;
};

const AccountBookDaily: React.FC = () => {
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const fetData = async () => {
      const result = await instance.get('/account-book/2022-07-01');
      console.log(result);
    };
    fetData();
  }, []);

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
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '333',
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '444',
            type: ACCOUNT_TYPE.INCOME,
            registerDate: '2022-07-20T22:11',
            amount: 10000,
            content: '오늘 얼마를 등록',
            categoryName: '은행',
          },
          {
            id: '555',
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

  const handleNavigateCreateAccount = async (event: React.MouseEvent) => {
    event.preventDefault();

    navigate('/account/create');
  };

  return (
    <CardArea>
      {results.map((item, idx) => (
        <AccountBookDailyCard key={idx} items={item} />
      ))}
      <GoTopButton />
      <PlusButton onClickPlus={handleNavigateCreateAccount} />
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
