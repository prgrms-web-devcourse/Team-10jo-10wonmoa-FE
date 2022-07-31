import React from 'react';
import styled from '@emotion/styled';
import { BottomNavigation, TopNavMonthSelector } from '@components';
import { TabsDisplayAccountSum, TabsNavigation } from '@components/account';
import { Outlet } from 'react-router-dom';
import { useMonthSelector } from '@hooks';
import { currencyFormatter } from '@utils/formatter/currencyFormatter';

const AccountBook = () => {
  const { date, handlePrevMonth, handleNextMonth } = useMonthSelector(
    new Date()
  );

  /**
   * API 명세 임시 목업 데이터
   * - Axios 세팅 후 연결
   * */
  const data = {
    results: {
      monthIncome: 60000,
      monthExpenditure: 20000,
      monthTotal: 40000,
    },
  };

  const { results: accountSum } = data;

  const ACCOUNT_BOOK_TAB_ITEMS = [
    {
      path: 'daily',
      title: '일일',
    },
    {
      path: 'calendar',
      title: '캘린더',
    },
    {
      path: 'monthly',
      title: '월간',
    },
  ];

  const ACCOUNT_TYPE = [
    {
      value: currencyFormatter(accountSum.monthIncome),
      title: '수입',
    },
    {
      value: currencyFormatter(accountSum.monthExpenditure),
      title: '지출',
    },
    {
      value: currencyFormatter(accountSum.monthTotal),
      title: '합계',
    },
  ];

  return (
    <>
      <TopNavMonthSelector
        date={date}
        onChangePrevMonth={handlePrevMonth}
        onChangeNextMonth={handleNextMonth}
      />
      <TabsNavigation tabItems={ACCOUNT_BOOK_TAB_ITEMS} />
      <TabsDisplayAccountSum tabItems={ACCOUNT_TYPE} />
      <Outlet />
      <BottomNavigation />
    </>
  );
};

export default AccountBook;

const Container = styled.div``;
